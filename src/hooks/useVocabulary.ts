import { useState, useEffect, useCallback, useRef } from 'react';

const cleanWord = (text: string): string | null => {
    const word = text.trim().toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "")
        .replace(/’s|'s/g, '');
    
    if (word && !word.includes(' ')) {
        return word;
    }
    return null;
}

export const useVocabulary = () => {
    const [vocabulary, setVocabulary] = useState<string[]>([]);
    const [toastMessage, setToastMessage] = useState('');
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [selectionPosition, setSelectionPosition] = useState<{ top: number, left: number } | null>(null);
    const debounceTimeoutRef = useRef<number | null>(null);

    // Load vocab from localStorage on mount
    useEffect(() => {
        try {
            const storedVocab = localStorage.getItem('ielts-vocabulary');
            if (storedVocab) {
                setVocabulary(JSON.parse(storedVocab));
            }
        } catch (error) {
            console.error("Failed to parse vocabulary from localStorage", error);
            localStorage.removeItem('ielts-vocabulary');
        }
    }, []);

    // Save vocab to localStorage on change
    useEffect(() => {
        try {
            if (vocabulary.length > 0) {
                 localStorage.setItem('ielts-vocabulary', JSON.stringify(vocabulary));
            } else {
                 localStorage.removeItem('ielts-vocabulary');
            }
        } catch (error) {
            console.error("Failed to save vocabulary to localStorage", error);
        }
    }, [vocabulary]);

    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => {
            setToastMessage(prev => (prev === message ? '' : prev));
        }, 3000);
    };
    
    const handleAddWord = useCallback((word: string) => {
        setVocabulary(currentVocab => {
            if (currentVocab.includes(word)) {
                showToast(`“${word}” 已在单词本中`);
                return currentVocab;
            } else {
                showToast(`已添加: “${word}”`);
                return [...currentVocab, word].sort();
            }
        });
        setSelectedWord(null);
    }, []);
    
    const handleDeleteWord = (wordToDelete: string) => {
        setVocabulary(prev => prev.filter(word => word !== wordToDelete));
    };

    const handleClearVocabulary = () => {
        setVocabulary([]);
    };

    // Global listeners for vocabulary features
    useEffect(() => {
        // For desktop: double-click to add
        const handleDoubleClick = () => {
            const selection = window.getSelection();
            if (selection) {
                const word = cleanWord(selection.toString());
                if (word) {
                    handleAddWord(word);
                }
            }
        };

        // For mobile: show add button on text selection
        const handleMouseUp = () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
            debounceTimeoutRef.current = window.setTimeout(() => {
                const selection = window.getSelection();
                if (selection && !selection.isCollapsed) {
                    const word = cleanWord(selection.toString());
                    if (word) {
                        const range = selection.getRangeAt(0);
                        const rect = range.getBoundingClientRect();
                        setSelectionPosition({
                            top: rect.top + window.scrollY - 40,
                            left: rect.left + window.scrollX + rect.width / 2,
                        });
                        setSelectedWord(word);
                    } else {
                        setSelectedWord(null);
                    }
                }
            }, 100); // Small debounce
        };

        const handleInteractionStart = () => {
            setSelectedWord(null);
        };
        
        document.addEventListener('dblclick', handleDoubleClick);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchend', handleMouseUp);
        document.addEventListener('mousedown', handleInteractionStart);
        document.addEventListener('touchstart', handleInteractionStart);
        window.addEventListener('scroll', handleInteractionStart);

        return () => {
            document.removeEventListener('dblclick', handleDoubleClick);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchend', handleMouseUp);
            document.removeEventListener('mousedown', handleInteractionStart);
            document.removeEventListener('touchstart', handleInteractionStart);
            window.removeEventListener('scroll', handleInteractionStart);
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, [handleAddWord]);
    
    return {
        vocabulary,
        toastMessage,
        selectedWord,
        selectionPosition,
        handleAddWord,
        handleDeleteWord,
        handleClearVocabulary,
        cleanWord,
    };
};