import React, { useState, useEffect, useCallback } from 'react';
import { styled, keyframes } from 'styled-components';
import { Page, Word } from '../types';
import { wordLists } from '../vocabulary';
import { WordList } from '../types';

const BackArrowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>;
const PrevIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>;
const NextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>;
const SpeakerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>;

// --- Learning Step Component ---
const LearnStep: React.FC<{ topic: WordList, onComplete: () => void }> = ({ topic, onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentWord = topic.words[currentIndex];

    const speak = useCallback((text: string) => {
        if (!('speechSynthesis' in window)) {
            console.warn('Speech synthesis not supported.');
            return;
        }
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();

        const preferredVoiceNames = [
            'Google UK English Female',
            'Google US English',
            'Microsoft Zira - English (United States)',
        ];
        
        let selectedVoice = voices.find(voice => preferredVoiceNames.includes(voice.name));
        if (!selectedVoice) {
            selectedVoice = voices.find(voice => voice.lang.startsWith('en-GB') && voice.name.includes('Google'));
        }
        if (!selectedVoice) {
            selectedVoice = voices.find(voice => voice.lang.startsWith('en-US') && voice.name.includes('Google'));
        }
        if (!selectedVoice) {
            selectedVoice = voices.find(voice => voice.lang.startsWith('en-GB'));
        }
        if (!selectedVoice) {
            selectedVoice = voices.find(voice => voice.lang.startsWith('en-US'));
        }
        
        utterance.voice = selectedVoice || null;
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }, []);

    useEffect(() => {
        const speakOnLoad = () => {
            // A small delay for UI transition and voice readiness
            setTimeout(() => speak(currentWord.word), 100);
        };

        if ('speechSynthesis' in window) {
            const voices = window.speechSynthesis.getVoices();
            if (voices.length > 0) {
                speakOnLoad();
            } else {
                window.speechSynthesis.onvoiceschanged = speakOnLoad;
            }
        }

        return () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.onvoiceschanged = null;
                window.speechSynthesis.cancel();
            }
        };
    }, [currentWord, speak]);

    const handleNext = () => setCurrentIndex(i => Math.min(i + 1, topic.words.length - 1));
    const handlePrev = () => setCurrentIndex(i => Math.max(i - 1, 0));
    
    return (
        <StepContainer>
            <Flashcard>
                {currentWord.illustration && 
                    <IllustrationContainer>
                        <currentWord.illustration />
                    </IllustrationContainer>
                }
                <WordDetails>
                    <WordRow>
                        <WordText>{currentWord.word}</WordText>
                        <SpeakButton onClick={() => speak(currentWord.word)} aria-label={`Listen to ${currentWord.word}`}>
                            <SpeakerIcon />
                        </SpeakButton>
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
                    <CompleteButton onClick={onComplete} $themeColor="learn">
                        我学完了
                    </CompleteButton>
                ) : (
                    <NavButton onClick={handleNext}><NextIcon/></NavButton>
                )}
            </FlashcardNav>
        </StepContainer>
    );
};

// --- Main Topic Page Component ---
const LearnPage: React.FC<{ topicId: string, navigateTo: (page: Page) => void }> = ({ topicId, navigateTo }) => {
    const topic = wordLists.find(list => list.id === topicId);
    const [step, setStep] = useState<'selection' | 'learning'>('selection');
    const [selectedWords, setSelectedWords] = useState<Word[]>([]);

    useEffect(() => {
        if (topic) {
            setSelectedWords(topic.words); // Initially select all words
        }
    }, [topic]);

    if (!topic) {
        return (
            <PageContainer>
                <p>主题未找到！</p>
                <button onClick={() => navigateTo('home')}>返回主页</button>
            </PageContainer>
        );
    }
    
    const handleSelectionChange = (word: Word, isSelected: boolean) => {
        if (isSelected) {
            setSelectedWords(prev => [...prev, word].sort((a, b) => topic.words.indexOf(a) - topic.words.indexOf(b)));
        } else {
            setSelectedWords(prev => prev.filter(w => w.word !== word.word));
        }
    };

    const handleSelectAll = (select: boolean) => {
        setSelectedWords(select ? topic.words : []);
    };
    
    const topicForLearning = { ...topic, words: selectedWords };

    if (step === 'selection') {
        return (
            <PageContainer>
                <PageHeader>
                    <BackButton onClick={() => navigateTo('home')} aria-label="返回主页">
                        <BackArrowIcon />
                    </BackButton>
                    <h1>选择要学习的单词</h1>
                </PageHeader>
                <SelectionContainer>
                    <SelectionActions>
                        <ActionButton onClick={() => handleSelectAll(true)}>全选</ActionButton>
                        <ActionButton onClick={() => handleSelectAll(false)}>全不选</ActionButton>
                    </SelectionActions>
                    <WordListContainer>
                        {topic.words.map(word => (
                            <WordItem key={word.word}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedWords.some(sw => sw.word === word.word)}
                                        onChange={(e) => handleSelectionChange(word, e.target.checked)}
                                    />
                                    <strong>{word.word}</strong>
                                    <span>- {word.definition}</span>
                                </label>
                            </WordItem>
                        ))}
                    </WordListContainer>
                    <StartButton
                        onClick={() => setStep('learning')}
                        disabled={selectedWords.length === 0}
                        $themeColor="learn"
                    >
                        开始学习 ({selectedWords.length})
                    </StartButton>
                </SelectionContainer>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <PageHeader>
                 <BackButton onClick={() => setStep('selection')} aria-label="返回选择单词">
                    <BackArrowIcon />
                </BackButton>
                <h1>{topic.title}</h1>
            </PageHeader>
            <main>
                <LearnStep topic={topicForLearning} onComplete={() => navigateTo('home')} />
            </main>
        </PageContainer>
    );
};

// --- STYLED COMPONENTS ---

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;

const PageContainer = styled.div`
    max-width: 900px;
    margin: 0 auto;
    animation: ${fadeIn} 0.5s ease;
`;

const PageHeader = styled.header`
    position: relative;
    text-align: center;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
        margin: 0;
        font-size: 2.5rem;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.header};
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        h1 { font-size: 1.75rem; }
    }
`;

const BackButton = styled.button`
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: ${({ theme }) => theme.colors.cardBg};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 50%;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: ${({ theme }) => theme.shadows.subtle};

    &:hover {
        background-color: ${({ theme }) => theme.colors.boxBg};
        color: ${({ theme }) => theme.colors.primary};
        transform: translateY(-50%) scale(1.05);
        box-shadow: ${({ theme }) => theme.shadows.main};
    }
`;

const StepContainer = styled.div`
    animation: ${fadeIn} 0.5s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// Learn Step Styles
const Flashcard = styled.div`
    background-color: ${({ theme }) => theme.colors.cardBg};
    border-radius: 24px;
    box-shadow: ${({ theme }) => theme.shadows.main};
    border: 1px solid ${({ theme }) => theme.colors.border};
    width: 100%;
    max-width: 380px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const IllustrationContainer = styled.div`
    background-color: #e6f8f2;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
        max-width: 100%;
        max-height: 100%;
    }
`;

const WordDetails = styled.div`
    padding: 1.75rem;
    text-align: center;
`;

const WordRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 0.25rem;
`;

const SpeakButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.label};
    padding: 0.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s, color 0.2s;
    
    &:hover {
        background-color: ${({ theme }) => theme.colors.boxBg};
        color: ${({ theme }) => theme.colors.primary};
    }

    svg {
        width: 28px;
        height: 28px;
    }
`;

const WordText = styled.h2`
    font-size: 2.75rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.header};
    margin: 0;
`;

const PhoneticText = styled.p`
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.label};
    margin: 0 0 1.5rem 0;
`;

const DefinitionText = styled.p`
    font-size: 1.25rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 1rem 0;
`;

const ExampleText = styled.p`
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.label};
    font-style: italic;
    margin: 0;
`;

const FlashcardNav = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 500px;
    margin-top: 1.5rem;
`;

const NavButton = styled.button`
    background-color: ${({ theme }) => theme.colors.cardBg};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.header};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.boxBg};
        transform: scale(1.05);
    }
    &:disabled {
        color: ${({ theme }) => theme.colors.label};
        cursor: not-allowed;
        opacity: 0.6;
    }
`;

const ProgressText = styled.div`
    font-size: 1.1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.label};
    width: 80px;
    text-align: center;
`;

const CompleteButton = styled.button<{ $themeColor?: 'learn' | 'games' | 'practice' }>`
    font-family: inherit;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.8rem 2rem;
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    background-color: ${({ theme, $themeColor = 'learn' }) => theme.colors[$themeColor]};
    color: white;
    box-shadow: 0 4px 10px ${({ theme, $themeColor = 'learn' }) => `${theme.colors[$themeColor]}4D`};

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 15px ${({ theme, $themeColor = 'learn' }) => `${theme.colors[$themeColor]}66`};
    }
`;

// Word Selection Styles
const SelectionContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.cardBg};
    border-radius: 24px;
    padding: 2rem;
    box-shadow: ${({ theme }) => theme.shadows.main};
    border: 1px solid ${({ theme }) => theme.colors.border};
    display: flex;
    flex-direction: column;
`;

const SelectionActions = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ActionButton = styled.button`
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.cardBg};
    color: ${({ theme }) => theme.colors.header};

    &:hover {
        background-color: ${({ theme }) => theme.colors.boxBg};
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

const WordListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 0.75rem;
    max-height: 55vh;
    overflow-y: auto;
    padding: 0.5rem;
    margin-bottom: 1.5rem;
`;

const WordItem = styled.div`
    label {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem;
        border-radius: 12px;
        cursor: pointer;
        transition: background-color 0.2s;
        border: 1px solid transparent;
        font-size: 0.95rem;

        &:hover {
            background-color: ${({ theme }) => theme.colors.boxBg};
        }
    }

    input[type="checkbox"] {
        appearance: none;
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        border: 2px solid ${({ theme }) => theme.colors.border};
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        transition: all 0.2s;
        flex-shrink: 0;

        &:checked {
            background-color: ${({ theme }) => theme.colors.learn};
            border-color: ${({ theme }) => theme.colors.learn};
        }

        &:checked::after {
            content: '✔';
            position: absolute;
            color: white;
            font-size: 14px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    strong {
        color: ${({ theme }) => theme.colors.header};
    }
    
    span {
        color: ${({ theme }) => theme.colors.label};
    }
`;

const StartButton = styled.button<{ $themeColor?: 'learn' | 'games' | 'practice' }>`
    font-family: inherit;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 0.9rem 2.5rem;
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    background-color: ${({ theme, disabled, $themeColor = 'primary' }) => disabled ? theme.colors.label : theme.colors[$themeColor]};
    color: white;
    box-shadow: 0 4px 10px ${({ theme, $themeColor = 'primary' }) => `${theme.colors[$themeColor]}4D`};
    margin: 1rem auto 0;
    display: block;

    &:not(:disabled):hover {
        transform: scale(1.05);
        box-shadow: 0 6px 15px ${({ theme, $themeColor = 'primary' }) => `${theme.colors[$themeColor]}66`};
    }
    
    &:disabled {
        cursor: not-allowed;
        box-shadow: none;
    }
`;


export default LearnPage;