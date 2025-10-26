import React from 'react';
import { styled } from 'styled-components';
import { Page } from '../types';

interface VocabularyFabProps {
    count: number;
    navigateTo: (page: Page) => void;
}

const BookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
);

const VocabularyFab: React.FC<VocabularyFabProps> = ({ count, navigateTo }) => {
    return (
        <FabButton onClick={() => navigateTo('my-words')} aria-label={`打开单词本, 当前有 ${count} 个单词`}>
            <BookIcon />
            {count > 0 && <Badge>{count}</Badge>}
        </FabButton>
    );
};

const FabButton = styled.button`
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primaryOrange};
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.2s ease, background-color 0.2s ease;
    z-index: 1001;

    &:hover {
        transform: scale(1.1);
        background-color: #d35400;
    }

    svg {
        width: 28px;
        height: 28px;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        bottom: 1rem;
        right: 1rem;
        width: 50px;
        height: 50px;
    }
`;

const Badge = styled.span`
    position: absolute;
    top: -4px;
    right: -4px;
    background-color: ${({ theme }) => theme.colors.primaryRed};
    color: white;
    border-radius: 50%;
    min-width: 24px;
    height: 24px;
    padding: 0 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 700;
    border: 2px solid white;
`;

export default VocabularyFab;