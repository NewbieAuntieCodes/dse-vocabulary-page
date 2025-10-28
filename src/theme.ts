// This file was previously a placeholder. Content has been added to resolve module import errors.
// FIX: Removed the side-effect import for 'styled-components' to resolve module augmentation error. The named import of `createGlobalStyle` is sufficient to establish module context.
import { createGlobalStyle } from 'styled-components';

export const theme = {
    colors: {
        bg: '#F7F8FC',
        cardBg: '#FFFFFF',
        boxBg: '#F1F3F5',
        text: '#4F5A77',
        header: '#1B264F',
        border: '#EAEBEE',
        label: '#8A9BAB',
        
        // Brand & Accent Colors
        primary: '#6D55FF', // Indigo
        primaryLight: '#F3F0FF',
        primaryBlue: '#3498db',
        primaryOrange: '#e67e22',
        shadow: 'rgba(0, 0, 0, 0.08)',

        // Section specific colors
        learn: '#00C49A', // Green
        learnLight: '#E6F8F2',
        skills: '#F52F70', // Pink/Magenta
        skillsLight: '#FFF0F5',
        myWords: '#6D55FF', // Indigo

        // Status colors
        primaryRed: '#e74c3c',

        // Compatibility colors from old theme
        highlightBg: '#e9f2ff',
        highlightBorder: '#c7dfff',
        dragOverBorder: '#6D55FF',
        newTag: '#e74c3c',
        cardYellowBg: '#fef9e7',
        person: '#3498db',
        personBg: 'rgba(52, 152, 219, 0.1)',
        personText: '#2980b9',
        event: '#9b59b6',
        eventBg: 'rgba(155, 89, 182, 0.1)',
        place: '#2ecc71',
        placeBg: 'rgba(46, 204, 113, 0.1)',
        placeText: '#27ae60',
        object: '#e67e22',
        objectBg: 'rgba(230, 126, 34, 0.1)',
        analysisVocab: '#e67e22',
        analysisPhrase: '#9b59b6',
        analysisSentence: '#3498db',
        analysisVocabBg: 'rgba(230, 126, 34, 0.1)',
        analysisPhraseBg: 'rgba(155, 89, 182, 0.1)',
        analysisSentenceBg: 'rgba(52, 152, 219, 0.1)',
        what: '#3498db',
        where: '#2ecc71',
        when: '#f1c40f',
        why: '#9b59b6',
        whyNot: '#e74c3c',
        how: '#e67e22',
        who: '#1abc9c',
        point: '#3498db',
        reason: '#e67e22',
        example: '#27ae60',
        analysisPointBg: 'rgba(52, 152, 219, 0.1)',
        analysisReasonBg: 'rgba(230, 126, 34, 0.1)',
        analysisExampleBg: 'rgba(39, 174, 96, 0.1)',
    },
    fonts: {
        body: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    },
    shadows: {
        subtle: '0 2px 4px rgba(77, 91, 158, 0.04)',
        main: '0 4px 6px rgba(0,0,0,0.04), 0 10px 20px rgba(77, 91, 158, 0.07)',
    },
    breakpoints: {
        mobile: '768px',
    }
};

type ThemeType = typeof theme;

// Fix: Resolved 'styled-components' module augmentation error.
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}

export const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${({ theme }) => theme.colors.bg};
        color: ${({ theme }) => theme.colors.text};
        margin: 0;
        font-family: ${({ theme }) => theme.fonts.body};
        font-size: 16px;
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .hidden {
        display: none;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideIn {
        from { transform: translateY(-30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideInMobile {
        from { transform: translateY(100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;