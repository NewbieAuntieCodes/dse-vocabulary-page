import React from 'react';
import { styled } from 'styled-components';
import { wordLists } from '../vocabulary';
import { Page } from '../types';

const HeroIllustration = () => (
    <svg width="450" height="300" viewBox="0 0 450 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="225" cy="150" r="145" fill="url(#hero-gradient)" />
        <path d="M155 240 C 180 200, 220 180, 250 190" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
        <path d="M280 140 Q 320 120, 340 160" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
        <rect x="120" y="100" width="80" height="120" rx="10" fill="#FFFFFF" opacity="0.8" transform="rotate(-15 120 100)" />
        <text x="145" y="165" fontFamily="sans-serif" fontSize="20" fill="#6D55FF" transform="rotate(-15 145 165)" fontWeight="bold">A</text>
        <circle cx="300" cy="220" r="25" fill="#FFAB00" />
        <circle cx="110" cy="210" r="15" fill="#F52F70" />
        <defs>
            <linearGradient id="hero-gradient" x1="225" y1="5" x2="225" y2="295" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6D55FF" />
                <stop offset="1" stopColor="#A855FF" />
            </linearGradient>
        </defs>
    </svg>
);

interface HomePageProps {
    navigateToActivity: (topicId: string, page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigateToActivity }) => {
    return (
        <HomeContainer>
            <HeroSection>
                <HeroText>
                    <h1>DSE 口语高频词汇</h1>
                    <p>选择一个主题，开始备战 DSE 口语考试！</p>
                </HeroText>
                <HeroIllustrationWrapper>
                    <HeroIllustration />
                </HeroIllustrationWrapper>
            </HeroSection>
            <TopicsGrid>
                {wordLists.map(list => (
                    <TopicCard key={list.id} onClick={() => navigateToActivity(list.id, list.theme as Page)} $theme={list.theme}>
                        <IllustrationContainer>
                            {list.illustration && <list.illustration />}
                        </IllustrationContainer>
                        <CardContent>
                            <h2>{list.title}</h2>
                            <p>{list.description}</p>
                        </CardContent>
                    </TopicCard>
                ))}
            </TopicsGrid>
        </HomeContainer>
    );
};

const HomeContainer = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;
    animation: fadeIn 0.5s ease;
`;

const HeroSection = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    margin-bottom: 4rem;
    padding: 2rem 0;

    @media (max-width: 800px) {
        flex-direction: column;
        text-align: center;
        margin-bottom: 3rem;
    }
`;

const HeroText = styled.div`
    max-width: 500px;
    h1 {
        font-size: 3.5rem;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.header};
        margin-bottom: 1rem;
        line-height: 1.2;
    }

    p {
        font-size: 1.25rem;
        color: ${({ theme }) => theme.colors.label};
        margin-top: 0;
        max-width: 40ch;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        h1 {
            font-size: 2.5rem;
        }
        p {
            font-size: 1.1rem;
        }
    }
`;

const HeroIllustrationWrapper = styled.div`
    @media (max-width: 800px) {
        margin-top: 2rem;
        svg {
            width: 300px;
            height: 200px;
        }
    }
`;

const TopicsGrid = styled.main`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        gap: 1.5rem;
    }
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

const TopicCard = styled.div<{ $theme: 'learn' | 'practice' | 'games' }>`
    background-color: ${({ theme, $theme }) => ({
        'learn': theme.colors.learnLight,
        'practice': theme.colors.practiceLight,
        'games': theme.colors.gamesLight
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
        box-shadow: ${({ $theme, theme }) => {
            const hoverColor = theme.colors[$theme];
            return `0 10px 20px 0 ${hoverColor}26`;
        }};
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
        flex-grow: 1;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 1.5rem;
        h2 {
            font-size: 1.5rem;
        }
    }
`;

export default HomePage;