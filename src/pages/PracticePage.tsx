import React, { useState, useEffect, useCallback } from 'react';
import { styled, keyframes, css } from 'styled-components';
import { Page, Word, WordList } from '../types';
import { wordLists } from '../vocabulary';

// --- ICONS ---
const BackArrowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>;
const BigSpeakerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>;

// --- HELPER FUNCTIONS ---
const shuffleArray = <T,>(array: T[]): T[] => array.sort(() => Math.random() - 0.5);

const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
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
type PracticeStep = 'topic' | 'mode' | 'quiz' | 'results';
type PracticeMode = 'eng-to-chi' | 'chi-to-eng' | 'listen-to-chi';
interface PracticeQuestion {
    prompt: string;
    correctAnswer: string;
    options: string[];
    word: Word;
}

// --- CONSTANTS ---
const allWords: Word[] = wordLists.flatMap(list => list.words);
const practiceTopics = wordLists.filter(list => list.id !== 'comprehensive-practice');

// --- QUESTION GENERATION ---
const createPracticeQuestions = (words: Word[], mode: PracticeMode): PracticeQuestion[] => {
    const shuffledAllWords = shuffleArray([...allWords]); // Shuffle all words once for performance
    return shuffleArray([...words]).map(correctWord => {
        const distractors: Word[] = [];
        // Find 3 distractors efficiently
        for (const potentialDistractor of shuffledAllWords) {
            if (distractors.length < 3 && potentialDistractor.word !== correctWord.word) {
                distractors.push(potentialDistractor);
            }
            if (distractors.length === 3) break;
        }

        if (mode === 'chi-to-eng') {
            const incorrectOptions = distractors.map(w => w.word);
            return {
                prompt: correctWord.definition,
                correctAnswer: correctWord.word,
                options: shuffleArray([correctWord.word, ...incorrectOptions]),
                word: correctWord
            };
        } else { // eng-to-chi and listen-to-chi
            const incorrectOptions = distractors.map(w => w.definition);
            return {
                prompt: correctWord.word,
                correctAnswer: correctWord.definition,
                options: shuffleArray([correctWord.definition, ...incorrectOptions]),
                word: correctWord
            };
        }
    });
};


// --- Practice Game Component (Internal) ---
const PracticeGame: React.FC<{ words: Word[], mode: PracticeMode, onComplete: () => void }> = ({ words, mode, onComplete }) => {
    const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
    const [masteredWords, setMasteredWords] = useState(new Set<string>());
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const resetGame = useCallback(() => {
        setQuestions(createPracticeQuestions(words, mode));
        setMasteredWords(new Set<string>());
        setSelectedOption(null);
        setIsCorrect(null);
    }, [words, mode]);

    useEffect(() => { resetGame(); }, [resetGame]);

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
                if (remainingQuestions.length === 0) onComplete(); else setQuestions(remainingQuestions);
            } else {
                setQuestions([...remainingQuestions, currentQuestion]);
            }
            setSelectedOption(null);
            setIsCorrect(null);
        }, correct ? 800 : 1500);
    };

    if (questions.length === 0) return <GameCard><p>正在加载...</p></GameCard>;
    
    const currentQuestion = questions[0];
    const getButtonState = (option: string) => {
        if (!selectedOption) return 'default';
        if (option === currentQuestion.correctAnswer) return 'correct';
        if (option === selectedOption) return 'incorrect';
        return 'disabled';
    };

    return (
        <GameCard>
             <ProgressBarContainer>
                <ProgressBar style={{ width: `${(masteredWords.size / words.length) * 100}%` }} />
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
const PracticePage: React.FC<{ navigateTo: (page: Page) => void }> = ({ navigateTo }) => {
    const [step, setStep] = useState<PracticeStep>('topic');
    const [selectedTopic, setSelectedTopic] = useState<WordList | null>(null);
    const [practiceMode, setPracticeMode] = useState<PracticeMode | null>(null);

    const handleBack = () => {
        switch (step) {
            case 'results': setStep('mode'); break;
            case 'quiz': setStep('mode'); break;
            case 'mode': setStep('topic'); setSelectedTopic(null); break;
            case 'topic': navigateTo('home'); break;
        }
    };
    
    const selectTopic = (topic: WordList) => {
        setSelectedTopic(topic);
        setStep('mode');
    };

    const selectMode = (mode: PracticeMode) => {
        setPracticeMode(mode);
        setStep('quiz');
    };
    
    const getTitle = () => {
        switch (step) {
            case 'topic': return '选择练习主题';
            case 'mode': return `选择模式: ${selectedTopic?.title}`;
            case 'quiz': return `练习中...`;
            case 'results': return '练习完成!';
        }
    };
    
    const renderContent = () => {
        switch (step) {
            case 'topic':
                return (
                    <TopicsGrid>
                        {practiceTopics.map(list => (
                            <TopicCard key={list.id} onClick={() => selectTopic(list)} $theme={list.theme}>
                                <IllustrationContainer>{list.illustration && <list.illustration />}</IllustrationContainer>
                                <CardContent><h2>{list.title}</h2><p>{list.description}</p></CardContent>
                            </TopicCard>
                        ))}
                    </TopicsGrid>
                );
            case 'mode':
                return (
                    <ModeSelectionContainer>
                        <ModeButton onClick={() => selectMode('eng-to-chi')}>看英文，选中意</ModeButton>
                        <ModeButton onClick={() => selectMode('chi-to-eng')}>看中意，选英文</ModeButton>
                        <ModeButton onClick={() => selectMode('listen-to-chi')}>听发音，选中意</ModeButton>
                    </ModeSelectionContainer>
                );
            case 'quiz':
                return <PracticeGame words={selectedTopic!.words} mode={practiceMode!} onComplete={() => setStep('results')} />;
            case 'results':
                return (
                    <ResultsContainer>
                        <h2>太棒了!</h2>
                        <p>你已完成“{selectedTopic?.title}”主题的练习。</p>
                        <ResultsActions>
                            <GameButton onClick={() => setStep('quiz')}>再练一次</GameButton>
                            <GameButton onClick={() => { setStep('topic'); setSelectedTopic(null); }} $secondary>选择其他主题</GameButton>
                        </ResultsActions>
                    </ResultsContainer>
                );
        }
    };
    
    return (
        <PageContainer>
            <PageHeader>
                <BackButton onClick={handleBack} aria-label="返回"><BackArrowIcon /></BackButton>
                <h1>{getTitle()}</h1>
            </PageHeader>
            <main>{renderContent()}</main>
        </PageContainer>
    );
};

// --- STYLED COMPONENTS ---
const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const popIn = keyframes`0% { opacity: 0; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); }`;

const PageContainer = styled.div`max-width: 1000px; margin: 0 auto; animation: ${fadeIn} 0.5s ease;`;

const PageHeader = styled.header`
    position: relative; text-align: center; margin-bottom: 3rem; display: flex; align-items: center; justify-content: center;
    h1 { margin: 0; font-size: 2.5rem; font-weight: 700; color: ${({ theme }) => theme.colors.header}; }
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) { h1 { font-size: 1.5rem; text-align: center; padding: 0 4rem;} margin-bottom: 2rem; }
`;

const BackButton = styled.button`
    position: absolute; left: 0; top: 50%; transform: translateY(-50%); background-color: ${({ theme }) => theme.colors.cardBg}; border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 50%; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; color: ${({ theme }) => theme.colors.text}; cursor: pointer; transition: all 0.2s ease;
    box-shadow: ${({ theme }) => theme.shadows.subtle};
    &:hover { background-color: ${({ theme }) => theme.colors.boxBg}; color: ${({ theme }) => theme.colors.primary}; transform: translateY(-50%) scale(1.05); box-shadow: ${({ theme }) => theme.shadows.main}; }
`;

// Topic Selection Styles
const TopicsGrid = styled.main`
    display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) { gap: 1.5rem; }
`;
const IllustrationContainer = styled.div`border-radius: 12px; overflow: hidden; margin-bottom: 1.5rem; background-color: rgba(255, 255, 255, 0.5);`;
const CardContent = styled.div`text-align: left;`;
const TopicCard = styled.div<{ $theme: 'learn' | 'practice' | 'games' }>`
    background-color: ${({ theme, $theme }) => ({'learn': theme.colors.learnLight, 'practice': theme.colors.practiceLight, 'games': theme.colors.gamesLight})[$theme] || theme.colors.cardBg};
    border-radius: 24px; padding: 1.5rem; box-shadow: ${({ theme }) => theme.shadows.subtle}; cursor: pointer; transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid ${({ theme, $theme }) => `${theme.colors[$theme]}40`}; display: flex; flex-direction: column;
    &:hover { transform: translateY(-8px); box-shadow: ${({ $theme, theme }) => `0 10px 20px 0 ${theme.colors[$theme]}26`}; }
    h2 { font-size: 1.75rem; font-weight: 600; color: ${({ $theme, theme }) => theme.colors[$theme]}; margin: 0 0 0.5rem 0; }
    p { font-size: 1rem; color: ${({ theme }) => theme.colors.label}; line-height: 1.6; margin: 0; flex-grow: 1; }
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) { padding: 1.5rem; h2 { font-size: 1.5rem; } }
`;

// Mode Selection Styles
const ModeSelectionContainer = styled.div`
    display: flex; flex-direction: column; align-items: center; gap: 1.5rem; margin-top: 2rem; animation: ${fadeIn} 0.5s;
`;
const ModeButton = styled.button`
    font-family: inherit; font-size: 1.25rem; font-weight: 600; padding: 1rem 2rem; border-radius: 16px; cursor: pointer; transition: all 0.2s ease;
    border: 2px solid ${({ theme }) => theme.colors.border}; background-color: ${({ theme }) => theme.colors.cardBg}; color: ${({ theme }) => theme.colors.header};
    width: 100%; max-width: 400px; box-shadow: ${({ theme }) => theme.shadows.subtle};
    &:hover { border-color: ${({ theme }) => theme.colors.practice}; color: ${({ theme }) => theme.colors.practice}; transform: translateY(-4px); box-shadow: ${({ theme }) => theme.shadows.main}; }
`;

// Practice Game Styles
const GameCard = styled.div`
    background-color: ${({ theme }) => theme.colors.cardBg}; border-radius: 24px; box-shadow: ${({ theme }) => theme.shadows.main}; border: 1px solid ${({ theme }) => theme.colors.border};
    width: 100%; max-width: 700px; margin: 0 auto; padding: 2.5rem; display: flex; flex-direction: column; align-items: center; position: relative; overflow: hidden; min-height: 450px;
    animation: ${fadeIn} 0.5s;
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) { padding: 1.5rem; min-height: 400px; }
`;
const ProgressBarContainer = styled.div`position: absolute; top: 0; left: 0; width: 100%; height: 8px; background-color: ${({ theme }) => theme.colors.boxBg};`;
const ProgressBar = styled.div`height: 100%; background-color: ${({ theme }) => theme.colors.practice}; transition: width 0.3s ease;`;
const PromptContainer = styled.div`width: 100%; height: 160px; display: flex; align-items: center; justify-content: center; margin-bottom: 2rem;`;
const ListenPromptContainer = styled(PromptContainer)``;
const PracticePromptText = styled.h2`font-size: 2.5rem; color: ${({ theme }) => theme.colors.header}; font-weight: 700; text-align: center;`;
const ListenButton = styled.button`
    background-color: ${({ theme }) => theme.colors.primaryLight}; border: none; width: 120px; height: 120px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;
    color: ${({ theme }) => theme.colors.primary}; transition: all 0.2s ease;
    &:hover { transform: scale(1.1); background-color: #E2DFFF; }
`;
const OptionsGrid = styled.div<{$isChinese?: boolean}>`
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; width: 100%;
    button { font-size: ${({ $isChinese }) => $isChinese ? '1.1rem' : '1.25rem'}; }
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) { grid-template-columns: 1fr; }
`;
const OptionButton = styled.button<{ $state: 'default' | 'correct' | 'incorrect' | 'disabled' }>`
    font-family: inherit; font-weight: 600; padding: 1.25rem; border-radius: 16px; cursor: pointer; transition: all 0.2s ease;
    border: 2px solid ${({ theme }) => theme.colors.border}; background-color: ${({ theme }) => theme.colors.cardBg}; color: ${({ theme }) => theme.colors.header};
    &:not(:disabled):hover { border-color: ${({ theme }) => theme.colors.practice}; color: ${({ theme }) => theme.colors.practice}; }
    ${({ $state, theme }) => {
        switch ($state) {
            case 'correct': return css`background-color: #E6F8F2; border-color: ${theme.colors.learn}; color: ${theme.colors.learn}; transform: scale(1.02);`;
            case 'incorrect': return css`background-color: #FDF2F2; border-color: ${theme.colors.primaryRed}; color: ${theme.colors.primaryRed};`;
            case 'disabled': return css`opacity: 0.6; cursor: not-allowed;`;
            default: return '';
        }
    }}
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
    background-color: ${({ theme, $secondary }) => $secondary ? theme.colors.boxBg : theme.colors.practice};
    color: ${({ theme, $secondary }) => $secondary ? theme.colors.header : 'white'};
    &:hover { transform: scale(1.05); }
`;


export default PracticePage;