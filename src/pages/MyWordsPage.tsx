import React, { useState } from 'react';
import { styled, keyframes } from 'styled-components';
import { Page } from '../types';

interface MyWordsPageProps {
    words: string[];
    navigateTo: (page: Page) => void;
    onDelete: (word: string) => void;
    onClear: () => void;
}

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
);

const MyWordsPage: React.FC<MyWordsPageProps> = ({ words, navigateTo, onDelete, onClear }) => {
    const [copyStatus, setCopyStatus] = useState('');

    const handleCopy = (format: 'comma' | 'newline') => {
        if (words.length === 0) return;
        const textToCopy = format === 'comma' ? words.join(', ') : words.join('\n');
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopyStatus('已复制！');
            setTimeout(() => setCopyStatus(''), 2000);
        }, () => {
            setCopyStatus('复制失败');
            setTimeout(() => setCopyStatus(''), 2000);
        });
    };

    return (
        <PageContainer>
            <PageHeader>
                <BackButton onClick={() => navigateTo('home')} aria-label="返回主页">
                    <BackArrowIcon />
                </BackButton>
                <h1>我的单词本</h1>
            </PageHeader>
            <MainContent>
                <WordsContent>
                    {words.length > 0 ? (
                        <TagContainer>
                            {words.map(word => (
                                <Tag key={word}>
                                    {word}
                                    <DeleteTagButton onClick={() => onDelete(word)} aria-label={`删除单词 ${word}`}>&times;</DeleteTagButton>
                                </Tag>
                            ))}
                        </TagContainer>
                    ) : (
                        <EmptyState>
                            <p>单词本是空的。</p>
                            <p>在任意页面双击英文单词即可收藏。</p>
                        </EmptyState>
                    )}
                </WordsContent>
                {words.length > 0 && (
                    <WordsFooter>
                        <CopyActions>
                            <CopyButton onClick={() => handleCopy('comma')}>复制 (逗号)</CopyButton>
                            <CopyButton onClick={() => handleCopy('newline')}>复制 (换行)</CopyButton>
                            {copyStatus && <CopyStatus>{copyStatus}</CopyStatus>}
                        </CopyActions>
                        <ClearButton onClick={onClear}>清空单词本</ClearButton>
                    </WordsFooter>
                )}
            </MainContent>
        </PageContainer>
    );
};

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

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

const MainContent = styled.main`
    background: ${({ theme }) => theme.colors.cardBg};
    border-radius: 24px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    box-shadow: ${({ theme }) => theme.shadows.main};
    overflow: hidden;
`;


const WordsContent = styled.div`
    padding: 2rem;
    overflow-y: auto;
    flex-grow: 1;
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 1.5rem;
    }
`;

const TagContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
`;

const Tag = styled.div`
    background-color: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid #BAC8FF;
    padding: 0.5rem 1rem;
    border-radius: 99px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    animation: ${fadeIn} 0.3s ease;
    font-size: 1rem;
`;

const DeleteTagButton = styled.button`
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
    padding: 0 0 1px 0;
    transition: background-color 0.2s;
    flex-shrink: 0;

    &:hover {
        background-color: #5C45E8;
    }
`;

const EmptyState = styled.div`
    text-align: center;
    color: ${({ theme }) => theme.colors.label};
    padding: 4rem 0;
    
    p {
        margin: 0.25rem 0;
        font-size: 1.1rem;
    }
`;

const WordsFooter = styled.footer`
    padding: 1rem 2rem;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.boxBg};
    flex-wrap: wrap;
    gap: 1rem;
    flex-shrink: 0;
`;

const CopyActions = styled.div`
    display: flex;
    gap: 0.75rem;
    align-items: center;
    flex-wrap: wrap;
`;

const CopyButton = styled.button`
    background: ${({ theme }) => theme.colors.cardBg};
    border: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.header};
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: ${({ theme }) => theme.colors.border};
        transform: translateY(-1px);
    }
`;

const CopyStatus = styled.span`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.learn};
    font-weight: 500;
`;

const ClearButton = styled.button`
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.primaryRed};
    font-weight: 600;
    cursor: pointer;
    font-size: 0.9rem;
    padding: 0.5rem;
    margin: -0.5rem;

    &:hover {
        text-decoration: underline;
    }
`;

export default MyWordsPage;
