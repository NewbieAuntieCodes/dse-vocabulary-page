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
    if (!('speechSynthesis' in window)) {
        console.warn('Speech synthesis not supported.');
        return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);

    const setVoiceAndSpeak = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) return;
        
        let selectedVoice = 
            voices.find(v => v.name === 'Samantha' && v.lang.startsWith('en-')) ||
            voices.find(v => v.name === 'Google US English') ||
            voices.find(v => v.name.includes('Zira') && v.lang.startsWith('en-')) ||
            voices.find(v => v.name === 'Daniel' && v.lang.startsWith('en-')) ||
            voices.find(v => v.lang === 'en-US' && v.localService) ||
            voices.find(v => v.lang === 'en-GB' && v.localService) ||
            voices.find(v => v.lang === 'en-US') ||
            voices.find(v => v.lang === 'en-GB') ||
            voices.find(v => v.lang.startsWith('en-'));
            
        utterance.voice = selectedVoice || null;
        utterance.lang = selectedVoice ? selectedVoice.lang : 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        window.speechSynthesis.onvoiceschanged = null;
        window.speechSynthesis.speak(utterance);
    }

    if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = setVoiceAndSpeak;
    } else {
        setVoiceAndSpeak();
    }
};

// --- TYPE DEFINITIONS ---
type PracticeStep = 'topic' | 'quiz' | 'results';
type PracticeMode = 'eng-to-chi' | 'chi-to-eng' | 'listen-to-chi' | 'fill-in-the-blank';
interface PracticeQuestion {
    prompt: string;
    correctAnswer: string;
    options: string[];
    word: Word;
}

// --- CONSTANTS ---
const allWords: Word[] = wordLists.flatMap(list => list.words);
const practiceTopics = wordLists.filter(list => list.category === 'dse' || list.category === 'skills');

// --- QUESTION GENERATION ---
const createPracticeQuestions = (words: Word[], mode: PracticeMode): PracticeQuestion[] => {
    const wordsInCurrentSet = new Set(words.map(w => w.word));
    const globalDistractors = shuffleArray(allWords.filter(w => !wordsInCurrentSet.has(w.word)));

    return shuffleArray([...words]).map(correctWord => {
        const localDistractors = shuffleArray(words.filter(w => w.word !== correctWord.word));
        const combinedDistractors = [...localDistractors, ...globalDistractors];
        const finalDistractors = combinedDistractors.slice(0, 3);
        
        if (mode === 'chi-to-eng') {
            const incorrectOptions = finalDistractors.map(w => w.word);
            return { prompt: correctWord.definition, correctAnswer: correctWord.word, options: shuffleArray([correctWord.word, ...incorrectOptions]), word: correctWord };
        } else if (mode === 'fill-in-the-blank') {
            const incorrectOptions = finalDistractors.map(w => w.word);
            const promptSentence = correctWord.example.replace(new RegExp(`\\b${correctWord.word}\\b`, 'i'), '_______');
            return { prompt: promptSentence, correctAnswer: correctWord.word, options: shuffleArray([correctWord.word, ...incorrectOptions]), word: correctWord };
        } else { // eng-to-chi and listen-to-chi
            const incorrectOptions = finalDistractors.map(w => w.definition);
            return { prompt: correctWord.word, correctAnswer: correctWord.definition, options: shuffleArray([correctWord.definition, ...incorrectOptions]), word: correctWord };
        }
    });
};


// --- Practice Game Component (Internal) ---
const PracticeGame: React.FC<{ words: Word[], mode: PracticeMode, onComplete: () => void }> = ({ words, mode, onComplete }) => {
    const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
    const [masteredWords, setMasteredWords] = useState(new Set<string>());
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const resetGame = useCallback(() => {
        setQuestions(createPracticeQuestions(words, mode));
        setMasteredWords(new Set<string>());
        setSelectedOption(null);
    }, [words, mode]);

    useEffect(() => { resetGame(); }, [resetGame]);

    useEffect(() => {
        if (mode === 'listen-to-chi' && questions.length > 0) speak(questions[0].word.word);
    }, [questions, mode]);
    
    const handleOptionClick = (option: string) => {
        if (selectedOption) return;

        const currentQuestion = questions[0];
        const correct = option === currentQuestion.correctAnswer;
        setSelectedOption(option);

        setTimeout(() => {
            const remainingQuestions = questions.slice(1);
            if (correct) {
                setMasteredWords(prev => new Set(prev).add(currentQuestion.word.word));
                if (remainingQuestions.length === 0) {
                    setTimeout(onComplete, 500);
                } else {
                    setQuestions(remainingQuestions);
                }
            } else {
                setQuestions([...remainingQuestions, currentQuestion]);
            }
            setSelectedOption(null);
        }, correct ? 800 : 2000);
    };

    if (questions.length === 0) return <GameCard><p>正在加载...</p></GameCard>;
    
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

            {mode === 'listen-to-chi' ? (
                <ListenPromptContainer>
                    <ListenButton onClick={() => speak(currentQuestion.word.word)} aria-label="Play sound"><BigSpeakerIcon /></ListenButton>
                </ListenPromptContainer>
            ) : (
                <PromptContainer>
                    <PracticePromptText $isSentence={mode === 'fill-in-the-blank'}>{currentQuestion.prompt}</PracticePromptText>
                </PromptContainer>
            )}

            <OptionsGrid $isChinese={mode === 'eng-to-chi' || mode === 'listen-to-chi'}>
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

    const handleTopicSelect = (topic: WordList) => {
        setSelectedTopic(topic);
        setStep('quiz');
    };

    const handleBack = () => {
        if (step === 'quiz' || step === 'results') {
            setStep('topic');
            setSelectedTopic(null);
        } else {
            navigateTo('home');
        }
    };

    const getTitle = () => {
        switch (step) {
            case 'quiz': return `练习: ${selectedTopic?.title}`;
            case 'results': return '练习完成!';
            default: return '选择一个主题开始练习';
        }
    };

    const renderContent = () => {
        switch (step) {
            case 'quiz':
                return <PracticeGame words={selectedTopic!.words} mode="fill-in-the-blank" onComplete={() => setStep('results')} />;
            case 'results':
                return (
                    <ResultsContainer>
                        <h2>太棒了!</h2>
                        <p>你已经完成了 “{selectedTopic?.title}” 的练习。</p>
                        <ResultsActions>
                            <GameButton onClick={() => setStep('topic')}>选择其他主题</GameButton>
                            <GameButton onClick={() => navigateTo('home')} $secondary>返回主页</GameButton>
                        </ResultsActions>
                    </ResultsContainer>
                );
            default:
                return (
                    <TopicSelectionContainer>
                        {practiceTopics.map(list => (
                            <TopicCard key={list.id} onClick={() => handleTopicSelect(list)} $theme={list.theme}>
                                <IllustrationContainer>
                                    {list.illustration && <list.illustration />}
                                </IllustrationContainer>
                                <CardContent>
                                    <h2>{list.title}</h2>
                                    <p>{list.description}</p>
                                </CardContent>
                            </TopicCard>
                        ))}
                    </TopicSelectionContainer>
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
const popIn = keyframes`from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; }`;

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

const TopicSelectionContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    animation: ${popIn} 0.3s ease-out;
`;

const IllustrationContainer = styled.div`
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 1.5rem;
    background-color: rgba(255, 255, 255, 0.5);
`;

const CardContent = styled.div`
    text-align: left;
`;

const TopicCard = styled.div<{ $theme: 'learn' | 'skills' | 'practice' }>`
    background-color: ${({ theme, $theme }) => ({
        'learn': theme.colors.learnLight,
        'skills': theme.colors.skillsLight,
        'practice': theme.colors.practiceLight
    })[$theme] || theme.colors.cardBg};
    border-radius: 24px;
    padding: 1.5rem;
    box-shadow: ${({ theme }) => theme.shadows.subtle};
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid ${({ theme, $theme }) => `${theme.colors[$theme]}40`};
    display: flex;
    flex-direction: column;

    &:hover {
        transform: translateY(-8px);
        box-shadow: ${({ $theme, theme }) => `0 10px 20px 0 ${theme.colors[$theme]}26`};
    }
    
    h2 {
        font-size: 1.75rem;
        font-weight: 600;
        color: ${({ $theme, theme }) => theme.colors[$theme]};
        margin: 0 0 0.5rem 0;
    }

    p {
        font-size: 1rem;
        color: ${({ theme }) => theme.colors.label};
        line-height: 1.6;
        margin: 0;
    }
`;


const GameCard = styled.div`
    background-color: ${({ theme }) => theme.colors.cardBg}; border-radius: 24px; box-shadow: ${({ theme }) => theme.shadows.main}; border: 1px solid ${({ theme }) => theme.colors.border};
    width: 100%; max-width: 700px; margin: 0 auto; padding: 2.5rem; display: flex; flex-direction: column; align-items: center; position: relative; overflow: hidden; min-height: 450px; animation: ${popIn} 0.3s ease-out;
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) { padding: 1.5rem; min-height: 400px; }
`;

const ProgressBarContainer = styled.div`position: absolute; top: 0; left: 0; width: 100%; height: 8px; background-color: ${({ theme }) => theme.colors.boxBg};`;
const ProgressBar = styled.div`height: 100%; background-color: ${({ theme }) => theme.colors.practice}; transition: width 0.3s ease;`;
const PromptContainer = styled.div`width: 100%; height: 200px; display: flex; align-items: center; justify-content: center; margin-bottom: 2rem;`;
const ListenPromptContainer = styled(PromptContainer)``;
const PracticePromptText = styled.h2<{ $isSentence?: boolean }>`
    font-size: ${({ $isSentence }) => $isSentence ? '1.75rem' : '2.5rem'};
    color: ${({ theme }) => theme.colors.header}; font-weight: 700; text-align: center;
    line-height: ${({ $isSentence }) => $isSentence ? '1.5' : '1.2'}; padding: 0 1rem;
`;

const ListenButton = styled.button`
    background-color: ${({ theme }) => theme.colors.practiceLight}; border: none; width: 120px; height: 120px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;
    color: ${({ theme }) => theme.colors.practice}; transition: all 0.2s ease;
    &:hover { transform: scale(1.1); background-color: #D6EAF8; }
`;

const OptionsGrid = styled.div<{$isChinese?: boolean}>`
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; width: 100%; max-width: 500px;
    button { font-size: ${({ $isChinese }) => $isChinese ? '1.1rem' : '1.25rem'}; }
`;

const OptionButton = styled.button<{ $state: 'default' | 'correct' | 'incorrect' | 'disabled' }>`
    font-family: inherit; font-weight: 600; padding: 1.25rem; border-radius: 16px; cursor: pointer; transition: all 0.2s ease;
    border: 2px solid ${({ theme }) => theme.colors.border}; background-color: ${({ theme }) => theme.colors.cardBg}; color: ${({ theme }) => theme.colors.header};
    &:not(:disabled):hover { border-color: ${({ theme }) => theme.colors.practice}; color: ${({ theme }) => theme.colors.practice}; }
    ${({ $state, theme }) => {
        switch ($state) {
            case 'correct': return css`background-color: #EAF4FC; border-color: ${theme.colors.practice}; color: ${theme.colors.practice}; transform: scale(1.05);`;
            case 'incorrect': return css`background-color: #FDF2F2; border-color: ${theme.colors.primaryRed}; color: ${theme.colors.primaryRed};`;
            case 'disabled': return css`opacity: 0.5; cursor: not-allowed;`;
            default: return '';
        }
    }}
`;

const ResultsContainer = styled.div`
    text-align: center; padding: 4rem 2rem; background-color: ${({ theme }) => theme.colors.cardBg}; border-radius: 24px; box-shadow: ${({ theme }) => theme.shadows.main};
    animation: ${popIn} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    h2 { font-size: 2.5rem; color: ${({ theme }) => theme.colors.practice}; margin: 0 0 0.5rem 0; }
    p { font-size: 1.1rem; color: ${({ theme }) => theme.colors.label}; margin: 0 0 2rem 0; }
`;
const ResultsActions = styled.div`display: flex; justify-content: center; gap: 1rem;`;
const GameButton = styled.button<{ $secondary?: boolean }>`
    font-family: inherit; font-size: 1rem; font-weight: 600; padding: 0.8rem 2rem; border-radius: 9999px; cursor: pointer; transition: all 0.2s ease;
    border: ${({ $secondary, theme }) => $secondary ? `2px solid ${theme.colors.border}` : 'none'};
    background-color: ${({ $secondary, theme }) => $secondary ? 'transparent' : theme.colors.practice};
    color: ${({ $secondary, theme }) => $secondary ? theme.colors.header : 'white'};
    &:hover { transform: scale(1.05); }
`;

export default PracticePage;