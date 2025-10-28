import React, { useState, useEffect, useCallback } from 'react';
import { styled, keyframes, css } from 'styled-components';
import { Page, Word, WordList } from '../types';
import { wordLists } from '../vocabulary';

// --- HELPER FUNCTIONS ---
const shuffleArray = <T,>(array: T[]): T[] => array.sort(() => Math.random() - 0.5);

const speak = (text: string) => {
    if (!('speechSynthesis' in window)) {
        console.warn('Speech synthesis not supported.');
        return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = voices.find(v => v.lang.startsWith('en-US') && v.name.includes('Google')) || voices.find(v => v.lang.startsWith('en-GB')) || voices.find(v => v.lang.startsWith('en-US'));
    utterance.voice = selectedVoice || null;
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
};


// --- TYPE DEFINITIONS ---
type Step = 'selection' | 'learning' | 'practice-eng-to-chi' | 'practice-chi-to-eng' | 'practice-listen-to-chi' | 'results';
type PracticeMode = 'eng-to-chi' | 'chi-to-eng' | 'listen-to-chi';
interface PracticeQuestion {
    prompt: string;
    correctAnswer: string;
    options: string[];
    word: Word;
}

// --- ICONS ---
const BackArrowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>;
const PrevIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>;
const NextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>;
const SpeakerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>;
const BigSpeakerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>;

// All words from all lists, for use as a global pool of distractors.
const allWords: Word[] = wordLists.flatMap(list => list.words);

// --- QUESTION GENERATION ---
const createPracticeQuestions = (words: Word[], mode: PracticeMode): PracticeQuestion[] => {
    // Pre-process distractors to improve performance
    const wordsInCurrentSet = new Set(words.map(w => w.word));
    const globalDistractors = shuffleArray(allWords.filter(w => !wordsInCurrentSet.has(w.word)));

    return shuffleArray([...words]).map(correctWord => {
        // 1. Prioritize distractors from the current word list.
        const localDistractors = shuffleArray(words.filter(w => w.word !== correctWord.word));
        
        // 2. Combine with global distractors to ensure we have enough options.
        const combinedDistractors = [...localDistractors, ...globalDistractors];

        // 3. Take the first 3 unique distractors.
        const finalDistractors = combinedDistractors.slice(0, 3);
        
        if (mode === 'chi-to-eng') {
            const incorrectOptions = finalDistractors.map(w => w.word);
            return {
                prompt: correctWord.definition,
                correctAnswer: correctWord.word,
                options: shuffleArray([correctWord.word, ...incorrectOptions]),
                word: correctWord
            };
        } else { // eng-to-chi and listen-to-chi
            const incorrectOptions = finalDistractors.map(w => w.definition);
            return {
                prompt: correctWord.word,
                correctAnswer: correctWord.definition,
                options: shuffleArray([correctWord.definition, ...incorrectOptions]),
                word: correctWord
            };
        }
    });
};


// --- Learning Step Component ---
const LearnStep: React.FC<{ topic: WordList, onComplete: () => void }> = ({ topic, onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentWord = topic.words[currentIndex];

    const handleSpeak = useCallback((text: string) => {
        speak(text);
    }, []);

    useEffect(() => {
        const speakOnLoad = () => setTimeout(() => handleSpeak(currentWord.word), 100);
        if ('speechSynthesis' in window) {
            if (window.speechSynthesis.getVoices().length > 0) speakOnLoad();
            else window.speechSynthesis.onvoiceschanged = speakOnLoad;
        }
        return () => { if ('speechSynthesis' in window) window.speechSynthesis.onvoiceschanged = null; };
    }, [currentWord, handleSpeak]);

    const handleNext = () => setCurrentIndex(i => Math.min(i + 1, topic.words.length - 1));
    const handlePrev = () => setCurrentIndex(i => Math.max(i - 1, 0));
    
    return (
        <StepContainer>
            <Flashcard>
                {currentWord.illustration && <IllustrationContainer><currentWord.illustration /></IllustrationContainer>}
                <WordDetails>
                    <WordRow>
                        <WordText>{currentWord.word}</WordText>
                        <SpeakButton onClick={() => handleSpeak(currentWord.word)} aria-label={`Listen to ${currentWord.word}`}><SpeakerIcon /></SpeakButton>
                    </WordRow>
                    <PhoneticText>{currentWord.phonetic}</PhoneticText>
                    <DefinitionText>{currentWord.definition}</DefinitionText>
                    <ExampleText>"{currentWord.example}"</ExampleText>
                </WordDetails>
            </Flashcard>
            <FlashcardNav>
                <NavButton onClick={handlePrev} disabled={currentIndex === 0}><PrevIcon/></NavButton>
                <ProgressText>{currentIndex + 1} / {topic.words.length}</ProgressText>
                {currentIndex === topic.words.length - 1 ? (
                    <CompleteButton onClick={onComplete} $themeColor="learn">开始练习</CompleteButton>
                ) : (
                    <NavButton onClick={handleNext}><NextIcon/></NavButton>
                )}
            </FlashcardNav>
        </StepContainer>
    );
};

// --- Practice Game Component ---
const PracticeGame: React.FC<{ words: Word[], mode: PracticeMode, onComplete: () => void }> = ({ words, mode, onComplete }) => {
    const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
    const [masteredWords, setMasteredWords] = useState(new Set<string>());
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const resetGame = useCallback(() => {
        const initialQuestions = createPracticeQuestions(words, mode);
        setQuestions(initialQuestions);
        setMasteredWords(new Set<string>());
        setSelectedOption(null);
        setIsCorrect(null);
    }, [words, mode]);

    useEffect(() => {
        resetGame();
    }, [resetGame]);

    useEffect(() => {
        if (mode === 'listen-to-chi' && questions.length > 0) {
            speak(questions[0].word.word);
        }
    }, [questions, mode]);
    
    const handleOptionClick = (option: string) => {
        if (selectedOption) return;

        const currentQuestion = questions[0];
        const correct = option === currentQuestion.correctAnswer;
        setSelectedOption(option);
        setIsCorrect(correct);

        setTimeout(() => {
            const remainingQuestions = questions.slice(1);

            if (correct) {
                setMasteredWords(prev => new Set(prev).add(currentQuestion.word.word));
                setQuestions(remainingQuestions);
                if (remainingQuestions.length === 0) {
                    setTimeout(onComplete, 500);
                }
            } else {
                const reinsertIndex = Math.min(3, remainingQuestions.length);
                const newQueue = [...remainingQuestions];
                newQueue.splice(reinsertIndex, 0, currentQuestion);
                setQuestions(newQueue);
            }
            
            setSelectedOption(null);
            setIsCorrect(null);
        }, correct ? 800 : 2000);
    };

    if (questions.length === 0) {
        return <GameCard><p>正在加载...</p></GameCard>;
    }
    
    const currentQuestion = questions[0];
    const totalQuestions = words.length;

    const getButtonState = (option: string) => {
        if (!selectedOption) return 'default';
        if (option === currentQuestion.correctAnswer) return 'correct';
        if (option === selectedOption) return 'incorrect';
        return 'disabled';
    };

    return (
        <GameCard>
             <ProgressBarContainer>
                <ProgressBar style={{ width: `${(masteredWords.size / totalQuestions) * 100}%` }} />
            </ProgressBarContainer>

            {mode === 'chi-to-eng' ? (
                <PromptContainer><PracticePromptText>{currentQuestion.prompt}</PracticePromptText></PromptContainer>
            ) : mode === 'listen-to-chi' ? (
                <ListenPromptContainer>
                    <ListenButton onClick={() => speak(currentQuestion.word.word)} aria-label="Play sound"><BigSpeakerIcon /></ListenButton>
                </ListenPromptContainer>
            ) : ( // eng-to-chi
                <PromptContainer><PracticePromptText>{currentQuestion.prompt}</PracticePromptText></PromptContainer>
            )}

            <OptionsGrid $isChinese={mode !== 'chi-to-eng'}>
                {currentQuestion.options.map(option => (
                    <OptionButton key={option} onClick={() => handleOptionClick(option)} disabled={!!selectedOption} $state={getButtonState(option)}>
                        {option}
                    </OptionButton>
                ))}
            </OptionsGrid>
        </GameCard>
    );
};

// --- Main Page Component ---
const LearnPage: React.FC<{ topicId: string, navigateTo: (page: Page) => void }> = ({ topicId, navigateTo }) => {
    const topic = wordLists.find(list => list.id === topicId);
    const [step, setStep] = useState<Step>('selection');
    const [selectedWords, setSelectedWords] = useState<Word[]>([]);

    useEffect(() => {
        if (topic) setSelectedWords(topic.words);
    }, [topic]);

    if (!topic) return <PageContainer><p>主题未找到！</p><button onClick={() => navigateTo('home')}>返回主页</button></PageContainer>;
    
    const handleSelectionChange = (word: Word, isSelected: boolean) => {
        setSelectedWords(prev => isSelected ? [...prev, word].sort((a, b) => topic.words.indexOf(a) - topic.words.indexOf(b)) : prev.filter(w => w.word !== word.word));
    };

    const handleSelectAll = (select: boolean) => setSelectedWords(select ? topic.words : []);
    
    const topicForLearning = { ...topic, words: selectedWords };

    const handleBack = () => {
        switch (step) {
            case 'results': setStep('practice-listen-to-chi'); break;
            case 'practice-listen-to-chi': setStep('practice-chi-to-eng'); break;
            case 'practice-chi-to-eng': setStep('practice-eng-to-chi'); break;
            case 'practice-eng-to-chi': setStep('learning'); break;
            case 'learning': setStep('selection'); break;
            case 'selection': navigateTo('home'); break;
        }
    };

    const getTitle = () => {
        switch (step) {
            case 'selection': return '选择要学习的单词';
            case 'practice-eng-to-chi': return '练习：看英文选中文';
            case 'practice-chi-to-eng': return '练习：看中文选英文';
            case 'practice-listen-to-chi': return '练习：听音辨词';
            case 'results': return '练习完成!';
            case 'learning': default: return topic.title;
        }
    };

    const renderContent = () => {
        switch (step) {
            case 'selection':
                return (
                    <SelectionContainer>
                        <SelectionActions>
                            <ActionButton onClick={() => handleSelectAll(true)}>全选</ActionButton>
                            <ActionButton onClick={() => handleSelectAll(false)}>全不选</ActionButton>
                        </SelectionActions>
                        <WordListContainer>
                            {topic.words.map(word => (
                                <WordItem key={word.word}>
                                    <label>
                                        <input type="checkbox" checked={selectedWords.some(sw => sw.word === word.word)} onChange={(e) => handleSelectionChange(word, e.target.checked)} />
                                        <strong>{word.word}</strong>
                                        <span>- {word.definition}</span>
                                    </label>
                                </WordItem>
                            ))}
                        </WordListContainer>
                        <StartButton onClick={() => setStep('learning')} disabled={selectedWords.length === 0} title={selectedWords.length === 0 ? "请至少选择一个单词" : ""} $themeColor="learn">
                            开始学习 ({selectedWords.length})
                        </StartButton>
                    </SelectionContainer>
                );
            case 'learning':
                return <LearnStep topic={topicForLearning} onComplete={() => setStep('practice-eng-to-chi')} />;
            case 'practice-eng-to-chi':
                return <PracticeGame words={selectedWords} mode="eng-to-chi" onComplete={() => setStep('practice-chi-to-eng')} />;
            case 'practice-chi-to-eng':
                return <PracticeGame words={selectedWords} mode="chi-to-eng" onComplete={() => setStep('practice-listen-to-chi')} />;
            case 'practice-listen-to-chi':
                return <PracticeGame words={selectedWords} mode="listen-to-chi" onComplete={() => setStep('results')} />;
            case 'results':
                 return (
                    <ResultsContainer>
                        <h2>太棒了!</h2>
                        <p>你已经完成了本主题的所有练习。</p>
                        <ResultsActions>
                            <GameButton onClick={() => setStep('selection')}>重新选择单词</GameButton>
                            <GameButton onClick={() => navigateTo('home')} $secondary>返回主页</GameButton>
                        </ResultsActions>
                    </ResultsContainer>
                );
            default: return null;
        }
    };

    return (
        <PageContainer>
            <PageHeader>
                <BackButton onClick={handleBack} aria-label="返回上一步"><BackArrowIcon /></BackButton>
                <h1>{getTitle()}</h1>
            </PageHeader>
            <main>{renderContent()}</main>
        </PageContainer>
    );
};

// --- STYLED COMPONENTS ---

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const popIn = keyframes`0% { opacity: 0; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); }`;

const PageContainer = styled.div`max-width: 900px; margin: 0 auto; animation: ${fadeIn} 0.5s ease;`;

const PageHeader = styled.header`
    position: relative; text-align: center; margin-bottom: 2rem; display: flex; align-items: center; justify-content: center;
    h1 { margin: 0; font-size: 2.5rem; font-weight: 700; color: ${({ theme }) => theme.colors.header}; }
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) { h1 { font-size: 1.75rem; } }
`;

const BackButton = styled.button`
    position: absolute; left: 0; top: 50%; transform: translateY(-50%); background-color: ${({ theme }) => theme.colors.cardBg}; border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 50%; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; color: ${({ theme }) => theme.colors.text}; cursor: pointer; transition: all 0.2s ease;
    box-shadow: ${({ theme }) => theme.shadows.subtle};
    &:hover { background-color: ${({ theme }) => theme.colors.boxBg}; color: ${({ theme }) => theme.colors.primary}; transform: translateY(-50%) scale(1.05); box-shadow: ${({ theme }) => theme.shadows.main}; }
`;

// --- Learn Step Styles ---
const StepContainer = styled.div`animation: ${fadeIn} 0.5s ease; display: flex; flex-direction: column; align-items: center;`;
const Flashcard = styled.div`background-color: ${({ theme }) => theme.colors.cardBg}; border-radius: 24px; box-shadow: ${({ theme }) => theme.shadows.main}; border: 1px solid ${({ theme }) => theme.colors.border}; width: 100%; max-width: 380px; overflow: hidden; display: flex; flex-direction: column;`;
const IllustrationContainer = styled.div`background-color: #e6f8f2; height: 200px; display: flex; align-items: center; justify-content: center; svg { max-width: 100%; max-height: 100%; }`;
const WordDetails = styled.div`padding: 1.75rem; text-align: center;`;
const WordRow = styled.div`display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 0.25rem;`;
const SpeakButton = styled.button`
    background: transparent; border: none; cursor: pointer; color: ${({ theme }) => theme.colors.label}; padding: 0.5rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: background-color 0.2s, color 0.2s;
    &:hover { background-color: ${({ theme }) => theme.colors.boxBg}; color: ${({ theme }) => theme.colors.primary}; }
    svg { width: 28px; height: 28px; }
`;
const WordText = styled.h2`font-size: 2.75rem; font-weight: 700; color: ${({ theme }) => theme.colors.header}; margin: 0;`;
const PhoneticText = styled.p`font-size: 1.1rem; color: ${({ theme }) => theme.colors.label}; margin: 0 0 1.5rem 0;`;
const DefinitionText = styled.p`font-size: 1.25rem; font-weight: 500; color: ${({ theme }) => theme.colors.text}; margin: 0 0 1rem 0;`;
const ExampleText = styled.p`font-size: 1rem; color: ${({ theme }) => theme.colors.label}; font-style: italic; margin: 0;`;
const FlashcardNav = styled.div`display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 500px; margin-top: 1.5rem;`;
const NavButton = styled.button`
    background-color: ${({ theme }) => theme.colors.cardBg}; border: 1px solid ${({ theme }) => theme.colors.border}; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; color: ${({ theme }) => theme.colors.header}; cursor: pointer; transition: all 0.2s ease;
    &:hover:not(:disabled) { background-color: ${({ theme }) => theme.colors.boxBg}; transform: scale(1.05); }
    &:disabled { color: ${({ theme }) => theme.colors.label}; cursor: not-allowed; opacity: 0.6; }
`;
const ProgressText = styled.div`font-size: 1.1rem; font-weight: 600; color: ${({ theme }) => theme.colors.label}; width: 80px; text-align: center;`;

// --- Word Selection Styles ---
const SelectionContainer = styled.div`background-color: ${({ theme }) => theme.colors.cardBg}; border-radius: 24px; padding: 2rem; box-shadow: ${({ theme }) => theme.shadows.main}; border: 1px solid ${({ theme }) => theme.colors.border}; display: flex; flex-direction: column;`;
const SelectionActions = styled.div`display: flex; gap: 1rem; margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid ${({ theme }) => theme.colors.border};`;
const ActionButton = styled.button`font-family: inherit; font-size: 0.9rem; font-weight: 600; padding: 0.5rem 1rem; border-radius: 9999px; cursor: pointer; transition: all 0.2s ease; border: 1px solid ${({ theme }) => theme.colors.border}; background-color: ${({ theme }) => theme.colors.cardBg}; color: ${({ theme }) => theme.colors.header}; &:hover { background-color: ${({ theme }) => theme.colors.boxBg}; border-color: ${({ theme }) => theme.colors.primary}; }`;
const WordListContainer = styled.div`display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 0.75rem; max-height: 55vh; overflow-y: auto; padding: 0.5rem; margin-bottom: 1.5rem;`;
const WordItem = styled.div`
    label { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 12px; cursor: pointer; transition: background-color 0.2s; border: 1px solid transparent; font-size: 0.95rem; &:hover { background-color: ${({ theme }) => theme.colors.boxBg}; } }
    input[type="checkbox"] { appearance: none; -webkit-appearance: none; width: 20px; height: 20px; border: 2px solid ${({ theme }) => theme.colors.border}; border-radius: 6px; cursor: pointer; position: relative; transition: all 0.2s; flex-shrink: 0;
        &:checked { background-color: ${({ theme }) => theme.colors.learn}; border-color: ${({ theme }) => theme.colors.learn}; }
        &:checked::after { content: '✔'; position: absolute; color: white; font-size: 14px; top: 50%; left: 50%; transform: translate(-50%, -50%); } }
    strong { color: ${({ theme }) => theme.colors.header}; }
    span { color: ${({ theme }) => theme.colors.label}; }
`;

// --- Practice Game Styles ---
const GameCard = styled.div`
    background-color: ${({ theme }) => theme.colors.cardBg}; border-radius: 24px; box-shadow: ${({ theme }) => theme.shadows.main}; border: 1px solid ${({ theme }) => theme.colors.border};
    width: 100%; max-width: 700px; margin: 0 auto; padding: 2.5rem; display: flex; flex-direction: column; align-items: center; position: relative; overflow: hidden; min-height: 450px;
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) { padding: 1.5rem; min-height: 400px; }
`;
const ProgressBarContainer = styled.div`position: absolute; top: 0; left: 0; width: 100%; height: 8px; background-color: ${({ theme }) => theme.colors.boxBg};`;
const ProgressBar = styled.div`height: 100%; background-color: ${({ theme }) => theme.colors.learn}; transition: width 0.3s ease;`;
const PromptContainer = styled.div`width: 100%; height: 200px; display: flex; align-items: center; justify-content: center; margin-bottom: 2rem;`;
const ListenPromptContainer = styled(PromptContainer)``;
const PracticePromptText = styled.h2`font-size: 2.5rem; color: ${({ theme }) => theme.colors.header}; font-weight: 700; text-align: center;`;
const ListenButton = styled.button`
    background-color: ${({ theme }) => theme.colors.primaryLight}; border: none; width: 120px; height: 120px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;
    color: ${({ theme }) => theme.colors.primary}; transition: all 0.2s ease;
    &:hover { transform: scale(1.1); background-color: #E2DFFF; }
`;
const OptionsGrid = styled.div<{$isChinese?: boolean}>`
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; width: 100%; max-width: 500px;
    button {
        font-size: ${({ $isChinese }) => $isChinese ? '1.1rem' : '1.25rem'};
    }
`;
const OptionButton = styled.button<{ $state: 'default' | 'correct' | 'incorrect' | 'disabled' }>`
    font-family: inherit; font-weight: 600; padding: 1.25rem; border-radius: 16px; cursor: pointer; transition: all 0.2s ease;
    border: 2px solid ${({ theme }) => theme.colors.border}; background-color: ${({ theme }) => theme.colors.cardBg}; color: ${({ theme }) => theme.colors.header};
    &:not(:disabled):hover { border-color: ${({ theme }) => theme.colors.learn}; color: ${({ theme }) => theme.colors.learn}; }
    ${({ $state, theme }) => {
        switch ($state) {
            case 'correct': return css`background-color: #E6F8F2; border-color: ${theme.colors.learn}; color: ${theme.colors.learn}; transform: scale(1.05);`;
            case 'incorrect': return css`background-color: #FDF2F2; border-color: ${theme.colors.primaryRed}; color: ${theme.colors.primaryRed};`;
            case 'disabled': return css`opacity: 0.5; cursor: not-allowed;`;
            default: return '';
        }
    }}
`;

// --- Shared & Results Buttons ---
const CompleteButton = styled.button<{ $themeColor?: 'learn' | 'games' }>`
    font-family: inherit; font-size: 1rem; font-weight: 600; padding: 0.8rem 2rem; border-radius: 9999px; cursor: pointer; transition: all 0.2s ease; border: none;
    background-color: ${({ theme, $themeColor = 'learn' }) => theme.colors[$themeColor]}; color: white; box-shadow: 0 4px 10px ${({ theme, $themeColor = 'learn' }) => `${theme.colors[$themeColor]}4D`};
    &:hover { transform: scale(1.05); box-shadow: 0 6px 15px ${({ theme, $themeColor = 'learn' }) => `${theme.colors[$themeColor]}66`}; }
`;
const StartButton = styled(CompleteButton)`
    font-size: 1.1rem; padding: 0.9rem 2.5rem; margin: 1rem auto 0; display: block;
    background-color: ${({ theme, disabled, $themeColor = 'primary' }) => disabled ? theme.colors.label : theme.colors[$themeColor]};
    &:not(:disabled):hover { transform: scale(1.05); }
    &:disabled { cursor: not-allowed; box-shadow: none; opacity: 0.7; }
`;
const ResultsContainer = styled.div`
    text-align: center; padding: 4rem 2rem; background-color: ${({ theme }) => theme.colors.cardBg}; border-radius: 24px; border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: ${({ theme }) => theme.shadows.main}; width: 100%; max-width: 600px; margin: 0 auto; animation: ${popIn} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    h2 { font-size: 2rem; color: ${({ theme }) => theme.colors.header}; margin: 0 0 0.5rem 0; }
    p { font-size: 1.1rem; color: ${({ theme }) => theme.colors.label}; max-width: 40ch; margin: 0 auto 1.5rem auto; }
`;
const ResultsActions = styled.div`display: flex; justify-content: center; gap: 1rem;`;
const GameButton = styled.button<{ $secondary?: boolean }>`
    font-family: inherit; font-size: 1rem; font-weight: 600; padding: 0.8rem 2rem; border-radius: 9999px; cursor: pointer; transition: all 0.2s ease; border: none;
    background-color: ${({ theme, $secondary }) => $secondary ? theme.colors.boxBg : theme.colors.learn};
    color: ${({ theme, $secondary }) => $secondary ? theme.colors.header : 'white'};
    &:hover { transform: scale(1.05); }
`;

export default LearnPage;