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
        if (voices.length === 0) {
            // Voices not loaded yet. The event listener will trigger this function again.
            return;
        }

        let selectedVoice = 
            // 1. High-quality voices by name, prioritizing female voices which are often perceived as clearer.
            voices.find(v => v.name === 'Samantha' && v.lang.startsWith('en-')) || // Apple (high quality)
            voices.find(v => v.name === 'Google US English') || // Google (high quality)
            voices.find(v => v.name.includes('Zira') && v.lang.startsWith('en-')) || // Microsoft (high quality)
            voices.find(v => v.name === 'Daniel' && v.lang.startsWith('en-')) || // Apple UK (high quality)
            
            // 2. Fallback to high-quality local (on-device) voices
            voices.find(v => v.lang === 'en-US' && v.localService) ||
            voices.find(v => v.lang === 'en-GB' && v.localService) ||
            
            // 3. Generic fallbacks for US/GB English
            voices.find(v => v.lang === 'en-US') ||
            voices.find(v => v.lang === 'en-GB') ||

            // 4. Any English voice
            voices.find(v => v.lang.startsWith('en-'));
            
        utterance.voice = selectedVoice || null;
        utterance.lang = selectedVoice ? selectedVoice.lang : 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1; // A pitch of 1 is generally the most natural.

        // It's good practice to remove the listener after use.
        window.speechSynthesis.onvoiceschanged = null;

        window.speechSynthesis.speak(utterance);
    }

    // Voices can load asynchronously. We need to handle both cases.
    if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = setVoiceAndSpeak;
    } else {
        setVoiceAndSpeak();
    }
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
// FIX: The component definition was truncated. Completed the function signature and added the component body.
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

// --- STYLED COMPONENTS (Copied from LearnPage and adapted) ---
const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;

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

const GameCard = styled.div`
    background-color: ${({ theme }) => theme.colors.cardBg}; border-radius: 24px; box-shadow: ${({ theme }) => theme.shadows.main}; border: 1px solid ${({ theme }) => theme.colors.border};
    width: 100%; max-width: 700px; margin: 0 auto; padding: 2.5rem; display: flex; flex-direction: column; align-items: center; position: relative; overflow: hidden; min-height: 450px;
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) { padding: 1.5rem; min-height: 400px; }
`;

const ProgressBarContainer = styled.div`position: absolute; top: 0; left: 0; width: 100%; height: 8px; background-color: ${({ theme }) => theme.colors.boxBg};`;
const ProgressBar = styled.div`height: 100%; background-color: ${({ theme }) => theme.colors.practice}; transition: width 0.3s ease;`;
const PromptContainer = styled.div`width: 100%; height: 200px; display: flex; align-items: center; justify-content: center; margin-bottom: 2rem;`;
const ListenPromptContainer = styled(PromptContainer)``;
const PracticePromptText = styled.h2`font-size: 2.5rem; color: ${({ theme }) => theme.colors.header}; font-weight: 700; text-align: center;`;

const ListenButton = styled.button`
    background-color: ${({ theme }) => theme.colors.practiceLight}; border: none; width: 120px; height: 120px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;
    color: ${({ theme }) => theme.colors.practice}; transition: all 0.2s ease;
    &:hover { transform: scale(1.1); background-color: #D6EAF8; }
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
