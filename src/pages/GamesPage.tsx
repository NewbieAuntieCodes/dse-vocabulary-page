import React, { useState, useEffect } from 'react';
import { styled, keyframes } from 'styled-components';
import { Page } from '../types';
import { wordLists } from '../vocabulary';
import { WordList } from '../types';

interface CardData {
    id: number;
    type: 'word' | 'definition';
    content: string;
    matchId: number;
    status: 'hidden' | 'visible' | 'matched';
}

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
);

const shuffleArray = <T,>(array: T[]): T[] => {
    return array.sort(() => Math.random() - 0.5);
};

const createGameCards = (wordList: WordList): CardData[] => {
    const cards: CardData[] = [];
    wordList.words.forEach((word, index) => {
        cards.push({ id: index * 2, type: 'word', content: word.word, matchId: index, status: 'hidden' });
        cards.push({ id: index * 2 + 1, type: 'definition', content: word.definition, matchId: index, status: 'hidden' });
    });
    return shuffleArray(cards);
};

const GamesPage: React.FC<{ navigateTo: (page: Page) => void }> = ({ navigateTo }) => {
    const [activeListId, setActiveListId] = useState<string>(wordLists[0].id);
    const [cards, setCards] = useState<CardData[]>([]);
    const [selectedCards, setSelectedCards] = useState<CardData[]>([]);
    const [isChecking, setIsChecking] = useState(false);
    const [gameState, setGameState] = useState<'playing' | 'won'>('playing');

    const resetGame = (listId: string) => {
        const list = wordLists.find(l => l.id === listId);
        if (list) {
            setCards(createGameCards(list));
        }
        setSelectedCards([]);
        setIsChecking(false);
        setGameState('playing');
        setActiveListId(listId);
    };
    
    useEffect(() => {
        resetGame(activeListId);
    }, [activeListId]);
    
    useEffect(() => {
        if (selectedCards.length === 2) {
            setIsChecking(true);
            const [first, second] = selectedCards;
            if (first.matchId === second.matchId) {
                // Correct Match
                setTimeout(() => {
                    setCards(prevCards =>
                        prevCards.map((card): CardData =>
                            card.matchId === first.matchId ? { ...card, status: 'matched' } : card
                        )
                    );
                    setSelectedCards([]);
                    setIsChecking(false);
                }, 500);
            } else {
                // Incorrect Match
                setTimeout(() => {
                    setCards(prevCards =>
                        // Explicitly type the return value of the map callback to ensure correct type inference.
                        prevCards.map((card): CardData =>
                            (card.id === first.id || card.id === second.id) ? { ...card, status: 'hidden' } : card
                        )
                    );
                    setSelectedCards([]);
                    setIsChecking(false);
                }, 1000);
            }
        }
    }, [selectedCards]);

    useEffect(() => {
        if (cards.length > 0 && cards.every(card => card.status === 'matched')) {
            setGameState('won');
        }
    }, [cards]);

    const handleCardClick = (clickedCard: CardData) => {
        if (isChecking || clickedCard.status !== 'hidden' || selectedCards.length >= 2) {
            return;
        }
        
        const newCards = cards.map((card): CardData =>
            card.id === clickedCard.id ? { ...card, status: 'visible' } : card
        );
        setCards(newCards);
        setSelectedCards([...selectedCards, clickedCard]);
    };

    const activeList = wordLists.find(l => l.id === activeListId);

    return (
        <PageContainer>
            <PageHeader>
                <BackButton onClick={() => navigateTo('home')} aria-label="返回主页">
                    <BackArrowIcon />
                </BackButton>
                <h1>趣味游戏 - 单词配对</h1>
            </PageHeader>
            <GameSetup>
                <p>选择一个词汇表开始游戏：</p>
                <ListSelector>
                    {wordLists.map(list => (
                        <ListButton key={list.id} $active={list.id === activeListId} onClick={() => resetGame(list.id)}>
                            {list.title}
                        </ListButton>
                    ))}
                </ListSelector>
            </GameSetup>
            <GameContainer>
                 {gameState === 'won' && (
                    <WinOverlay>
                        <WinContent>
                            <h2>太棒了！</h2>
                            <p>你完成了“{activeList?.title}”词汇表的配对！</p>
                            <WinButton onClick={() => resetGame(activeListId)}>再玩一次</WinButton>
                        </WinContent>
                    </WinOverlay>
                )}
                <GameGrid cardCount={cards.length}>
                    {cards.map(card => (
                        <CardScene key={card.id} onClick={() => handleCardClick(card)}>
                            <Card $isFlipped={card.status !== 'hidden'}>
                                <CardFace $isFront={false}>?</CardFace>
                                <CardFace $isFront={true} $type={card.type} $isMatched={card.status === 'matched'}>
                                    {card.content}
                                </CardFace>
                            </Card>
                        </CardScene>
                    ))}
                </GameGrid>
            </GameContainer>
        </PageContainer>
    );
};

const PageContainer = styled.div`
    max-width: 900px;
    margin: 0 auto;
    animation: fadeIn 0.5s ease;
`;

const PageHeader = styled.header`
    position: relative;
    text-align: center;
    margin-bottom: 3rem;
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
        margin-bottom: 2rem;
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

const GameSetup = styled.div`
    background-color: ${({ theme }) => theme.colors.cardBg};
    padding: 1.5rem 2rem;
    border-radius: 24px;
    margin-bottom: 2.5rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: ${({ theme }) => theme.shadows.subtle};

    p {
        margin: 0 0 1rem 0;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.label};
    }
`;

const ListSelector = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
`;

const ListButton = styled.button<{ $active?: boolean }>`
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    padding: 0.6rem 1.2rem;
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 2px solid transparent;
    background-color: ${({ theme, $active }) => $active ? theme.colors.games : theme.colors.boxBg};
    color: ${({ theme, $active }) => $active ? 'white' : theme.colors.header};

    &:hover {
        transform: translateY(-2px);
        border-color: ${({ theme, $active }) => $active ? theme.colors.games : theme.colors.border};
    }
`;

const GameContainer = styled.main`
    position: relative;
`;

const GameGrid = styled.div<{ cardCount: number }>`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1rem;
    ${({ cardCount }) => cardCount > 12 && `
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    `}
`;

const CardScene = styled.div`
    perspective: 1000px;
    height: 120px;
    cursor: pointer;
`;

const Card = styled.div<{ $isFlipped: boolean }>`
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.6s;
    transform: ${({ $isFlipped }) => ($isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
`;

const CardFace = styled.div<{ $isFront: boolean; $type?: 'word' | 'definition'; $isMatched?: boolean }>`
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    box-shadow: ${({ theme }) => theme.shadows.subtle};
    font-size: 1.25rem;
    font-weight: 600;
    padding: 0.5rem;
    text-align: center;
    border: 1px solid ${({ theme }) => theme.colors.border};


    ${({ $isFront }) =>
        $isFront
            ? `
                background-color: white;
                transform: rotateY(180deg);
            `
            : `
                background: linear-gradient(135deg, #A88BEB, #F8CEEC);
                color: white;
                font-size: 2.5rem;
                border: none;
            `
    }
    
    ${({ $type, theme }) => $type === 'word' && `color: ${theme.colors.games};`}
    ${({ $type, theme }) => $type === 'definition' && `color: ${theme.colors.header}; font-size: 1.5rem;`}
    
    ${({ $isMatched, theme }) => $isMatched && `
        background-color: #E6F8F2;
        color: ${theme.colors.learn};
        border-color: ${theme.colors.learn};
    `}
`;

const winAnimation = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const WinOverlay = styled.div`
    position: absolute;
    top: -2rem;
    left: -2rem;
    right: -2rem;
    bottom: -2rem;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${winAnimation} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border-radius: 32px;
`;

const WinContent = styled.div`
    background-color: white;
    padding: 3rem;
    border-radius: 24px;
    text-align: center;
    box-shadow: ${({ theme }) => theme.shadows.main};
    border: 1px solid ${({ theme }) => theme.colors.border};

    h2 {
        font-size: 2.5rem;
        color: ${({ theme }) => theme.colors.games};
        margin: 0 0 0.5rem 0;
    }
    p {
        font-size: 1.1rem;
        color: ${({ theme }) => theme.colors.label};
        margin: 0 0 1.5rem 0;
    }
`;

const WinButton = styled.button`
    font-family: inherit;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.8rem 2rem;
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    background-color: ${({ theme }) => theme.colors.games};
    color: white;
    box-shadow: 0 4px 10px rgba(121, 80, 242, 0.3);

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 15px rgba(121, 80, 242, 0.4);
    }
`;


export default GamesPage;