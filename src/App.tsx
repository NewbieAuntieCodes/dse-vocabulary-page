import React, { useState } from 'react';
import { styled, ThemeProvider } from 'styled-components';
import { Page } from './types';
import Toast from './components/Toast';
import VocabularyFab from './components/VocabularyFab';
import SelectionAddButton from './components/SelectionAddButton';
import PageRouter from './components/PageRouter';

import { theme, GlobalStyles } from './theme';
import { useVocabulary } from './hooks/useVocabulary';

const AppWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    background-color: ${({ theme }) => theme.colors.bg};
    min-height: 100vh;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        padding: 1.5rem;
    }
`;

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('home');
    const [activeTopicId, setActiveTopicId] = useState<string | null>(null);

    const {
        vocabulary,
        toastMessage,
        selectedWord,
        selectionPosition,
        handleAddWord,
        handleDeleteWord,
        handleClearVocabulary,
    } = useVocabulary();
    
    const navigateTo = (targetPage: Page) => {
        window.scrollTo(0, 0); // Scroll to top on page change
        setPage(targetPage);
         if (targetPage !== 'learn') {
            setActiveTopicId(null);
        }
    };

    const navigateToActivity = (topicId: string, activityPage: Page) => {
        window.scrollTo(0, 0);
        setActiveTopicId(topicId);
        setPage(activityPage);
    };


    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <AppWrapper>
                <PageRouter 
                    page={page}
                    navigateTo={navigateTo}
                    navigateToActivity={navigateToActivity}
                    activeTopicId={activeTopicId}
                    vocabulary={vocabulary}
                    handleDeleteWord={handleDeleteWord}
                    handleClearVocabulary={handleClearVocabulary}
                />
            </AppWrapper>

            {/* Vocabulary Feature Components */}
            {selectedWord && selectionPosition && (
                <SelectionAddButton
                    position={selectionPosition}
                    onAdd={() => handleAddWord(selectedWord)}
                />
            )}
            <VocabularyFab count={vocabulary.length} navigateTo={navigateTo} />
            <Toast message={toastMessage} />
        </ThemeProvider>
    );
};

export default App;