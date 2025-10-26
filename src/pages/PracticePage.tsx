import React, { useState, useEffect, useCallback } from 'react';
import { styled, keyframes, css } from 'styled-components';
import { Page, Word, WordList } from '../types';
import { wordLists } from '../vocabulary';


type GameMode = 'image' | 'listening';

const BackArrowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>;
const SpeakerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>;
const ImageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>;
const SoundIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>;


const shuffleArray = <T,>(array: T[]): T[] => array.sort(() => Math.random() - 0.5);

interface Question {
    word: Word;
    options: string[];
}

const createGameQuestions = (words: Word[]): Question[] => {
    if (words.length === 0) return [];
    const shuffledWords = shuffleArray([...words]);
    return shuffledWords.map(correctWord => {
        const otherWords = words.filter(w => w.word !== correctWord.word);
        const incorrectOptions = shuffleArray(otherWords).slice(0, 3).map(w => w.word);
        const options = shuffleArray([correctWord.word, ...incorrectOptions]);
        return {
            word: correctWord,
            options,
        };
    });
};

const speak = (text: string) => {
    if (!('speechSynthesis' in window)) {
        console.warn('Speech synthesis not supported.');
        return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
};


interface GameProps {
    topic: WordList;
    gameMode: GameMode;
    onGameChange: (mode: GameMode) => void;
}

const Game: React.FC<GameProps> = ({ topic, gameMode, onGameChange }) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [totalQuestionsInTopic, setTotalQuestionsInTopic] = useState(0);
    const [masteredWords, setMasteredWords] = useState(new Set<string>());
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [isFinished, setIsFinished] = useState(false);

    const resetGame = useCallback(() => {
        const initialQuestions = createGameQuestions(topic.words);
        setQuestions(initialQuestions);
        setTotalQuestionsInTopic(initialQuestions.length);
        setMasteredWords(new Set<string>());
        setSelectedOption(null);
        setIsCorrect(null);
        setIsFinished(false);
    }, [topic]);

    useEffect(() => {
        resetGame();
    }, [resetGame]);

    useEffect(() => {
        if (gameMode === 'listening' && questions.length > 0 && !isFinished) {
            speak(questions[0].word.word);
        }
    }, [questions, gameMode, isFinished]);
    
    const handleOptionClick = (option: string) => {
        if (selectedOption) return;

        const currentQuestion = questions[0];
        const correct = option === currentQuestion.word.word;
        setSelectedOption(option);
        setIsCorrect(correct);

        setTimeout(() => {
            const remainingQuestions = questions.slice(1);

            if (correct) {
                setMasteredWords(prev => new Set(prev).add(currentQuestion.word.word));
                setQuestions(remainingQuestions);
                if (remainingQuestions.length === 0) {
                    setIsFinished(true);
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

    if (questions.length === 0 && !isFinished) {
        return <GameCard><p>正在加载游戏...</p></GameCard>;
    }

    if (isFinished) {
        return (
            <ResultsContainer>
                <h2>练习完成!</h2>
                <p>你的得分是:</p>
                <ScoreText>{masteredWords.size} / {totalQuestionsInTopic}</ScoreText>
                <ResultsActions>
                    <GameButton onClick={resetGame}>再玩一次</GameButton>
                    <GameButton onClick={() => onGameChange(gameMode === 'image' ? 'listening' : 'image')} $secondary>
                        {gameMode === 'image' ? '挑战听力' : '挑战识图'}
                    </GameButton>
                </ResultsActions>
            </ResultsContainer>
        );
    }
    
    const currentQuestion = questions[0];

    const getButtonState = (option: string) => {
        if (!selectedOption) return 'default';
        if (option === currentQuestion.word.word) return 'correct';
        if (option === selectedOption) return 'incorrect';
        return 'disabled';
    };

    return (
        <GameCard>
             <ProgressBarContainer>
                <ProgressBar style={{ width: `${(masteredWords.size / totalQuestionsInTopic) * 100}%` }} />
            </ProgressBarContainer>

            {gameMode === 'image' ? (
                <ImagePromptContainer>
                    {currentQuestion.word.illustration ? <currentQuestion.word.illustration /> : <span>No Image</span>}
                </ImagePromptContainer>
            ) : (
                <ListenPromptContainer>
                    <ListenButton onClick={() => speak(currentQuestion.word.word)} aria-label="Play sound">
                        <SpeakerIcon />
                    </ListenButton>
                </ListenPromptContainer>
            )}

            <OptionsGrid>
                {currentQuestion.options.map(option => (
                    <OptionButton 
                        key={option} 
                        onClick={() => handleOptionClick(option)}
                        disabled={!!selectedOption}
                        $state={getButtonState(option)}
                    >
                        {option}
                    </OptionButton>
                ))}
            </OptionsGrid>
        </GameCard>
    );
};


const PracticePage: React.FC<{ topicId: string, navigateTo: (page: Page) => void }> = ({ topicId, navigateTo }) => {
    const topic = wordLists.find(list => list.id === topicId);
    const [step, setStep] = useState<'selection' | 'practice'>('selection');
    const [selectedWords, setSelectedWords] = useState<Word[]>([]);
    const [gameMode, setGameMode] = useState<GameMode>('image');

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
    
    const topicForPractice = { ...topic, words: selectedWords };

     if (step === 'selection') {
        return (
            <PageContainer>
                <PageHeader>
                    <BackButton onClick={() => navigateTo('home')} aria-label="返回主页">
                        <BackArrowIcon />
                    </BackButton>
                    <h1>选择要练习的单词</h1>
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
                        onClick={() => setStep('practice')}
                        disabled={selectedWords.length < 4}
                        title={selectedWords.length < 4 ? "至少选择4个单词才能开始游戏" : ""}
                        $themeColor="practice"
                    >
                        开始练习 ({selectedWords.length})
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
                <GameTabs>
                    <TabButton $active={gameMode === 'image'} onClick={() => setGameMode('image')}>
                        <ImageIcon /> 看图识词
                    </TabButton>
                    <TabButton $active={gameMode === 'listening'} onClick={() => setGameMode('listening')}>
                        <SoundIcon /> 听音辨词
                    </TabButton>
                </GameTabs>

                <Game key={gameMode} topic={topicForPractice} gameMode={gameMode} onGameChange={setGameMode} />
            </main>
        </PageContainer>
    );
};

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const popIn = keyframes`
    0% { opacity: 0; transform: scale(0.9); }
    100% { opacity: 1; transform: scale(1); }
`;

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

const GameTabs = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
`;

const TabButton = styled.button<{ $active: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid ${({ theme, $active }) => $active ? 'transparent' : theme.colors.border};
    background-color: ${({ theme, $active }) => $active ? theme.colors.practice : theme.colors.cardBg};
    color: ${({ theme, $active }) => $active ? 'white' : theme.colors.header};

    &:hover {
        transform: translateY(-2px);
    }
`;

const GameCard = styled.div`
    background-color: ${({ theme }) => theme.colors.cardBg};
    border-radius: 24px;
    box-shadow: ${({ theme }) => theme.shadows.main};
    border: 1px solid ${({ theme }) => theme.colors.border};
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
    min-height: 450px;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 1.5rem;
        min-height: 400px;
    }
`;

const ProgressBarContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background-color: ${({ theme }) => theme.colors.boxBg};
`;

const ProgressBar = styled.div`
    height: 100%;
    background-color: ${({ theme }) => theme.colors.practice};
    transition: width 0.3s ease;
`;

const ImagePromptContainer = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
    
    svg {
        max-width: 100%;
        max-height: 100%;
    }
`;

const ListenPromptContainer = styled(ImagePromptContainer)``;

const ListenButton = styled.button`
    background-color: ${({ theme }) => theme.colors.primaryLight};
    border: none;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};
    transition: all 0.2s ease;
    
    &:hover {
        transform: scale(1.1);
        background-color: #E2DFFF;
    }
`;

const OptionsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    width: 100%;
    max-width: 500px;
`;

const OptionButton = styled.button<{ $state: 'default' | 'correct' | 'incorrect' | 'disabled' }>`
    font-family: inherit;
    font-size: 1.25rem;
    font-weight: 600;
    padding: 1.25rem;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 2px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.cardBg};
    color: ${({ theme }) => theme.colors.header};
    
    &:not(:disabled):hover {
        border-color: ${({ theme }) => theme.colors.practice};
        color: ${({ theme }) => theme.colors.practice};
    }
    
    ${({ $state, theme }) => {
        switch ($state) {
            case 'correct':
                return css`
                    background-color: #E6F8F2;
                    border-color: ${theme.colors.learn};
                    color: ${theme.colors.learn};
                    transform: scale(1.05);
                `;
            case 'incorrect':
                return css`
                    background-color: #FDF2F2;
                    border-color: ${theme.colors.primaryRed};
                    color: ${theme.colors.primaryRed};
                `;
            case 'disabled':
                return css`
                    opacity: 0.5;
                    cursor: not-allowed;
                `;
            default:
                return '';
        }
    }}
`;

const ResultsContainer = styled.div`
    text-align: center;
    padding: 4rem 2rem;
    background-color: ${({ theme }) => theme.colors.cardBg};
    border-radius: 24px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: ${({ theme }) => theme.shadows.main};
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    animation: ${popIn} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    h2 { font-size: 2rem; color: ${({ theme }) => theme.colors.header}; margin: 0 0 0.5rem 0; }
    p { font-size: 1.1rem; color: ${({ theme }) => theme.colors.label}; max-width: 40ch; margin: 0 auto 1rem auto; }
`;

const ScoreText = styled.div`
    font-size: 3.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.practice};
    margin-bottom: 2rem;
`;

const ResultsActions = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
`;

const GameButton = styled.button<{ $secondary?: boolean }>`
    font-family: inherit;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.8rem 2rem;
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    background-color: ${({ theme, $secondary }) => $secondary ? theme.colors.boxBg : theme.colors.practice};
    color: ${({ theme, $secondary }) => $secondary ? theme.colors.header : 'white'};
    
    &:hover {
        transform: scale(1.05);
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
            background-color: ${({ theme }) => theme.colors.practice};
            border-color: ${({ theme }) => theme.colors.practice};
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
        opacity: 0.7;
    }
`;

export default PracticePage;