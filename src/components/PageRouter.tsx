import React from 'react';
import HomePage from '../pages/HomePage';
import LearnPage from '../pages/LearnPage';
import MyWordsPage from '../pages/MyWordsPage';
import { Page } from '../types';

interface PageRouterProps {
    page: Page;
    navigateTo: (page: Page) => void;
    navigateToActivity: (topicId: string, page: Page) => void;
    activeTopicId: string | null;
    vocabulary: string[];
    handleDeleteWord: (word: string) => void;
    handleClearVocabulary: () => void;
}

const PageRouter: React.FC<PageRouterProps> = ({ 
    page, 
    navigateTo, 
    navigateToActivity,
    activeTopicId,
    vocabulary,
    handleDeleteWord,
    handleClearVocabulary
}) => {
    switch (page) {
        case 'learn':
            return <LearnPage 
                        topicId={activeTopicId!} 
                        navigateTo={navigateTo} 
                    />;
        case 'my-words':
            return <MyWordsPage 
                        navigateTo={navigateTo} 
                        words={vocabulary}
                        onDelete={handleDeleteWord}
                        onClear={handleClearVocabulary}
                    />;
        case 'home':
        default:
            return <HomePage navigateToActivity={navigateToActivity} />;
    }
};

export default PageRouter;