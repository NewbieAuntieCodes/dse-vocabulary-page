import React from 'react';
import { styled, keyframes } from 'styled-components';

interface SelectionAddButtonProps {
    position: { top: number; left: number };
    onAdd: () => void;
}

// Self-closing SVG <line> elements to be valid JSX.
const AddIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const SelectionAddButton: React.FC<SelectionAddButtonProps> = ({ position, onAdd }) => {
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        onAdd();
    };

    return (
        <ButtonWrapper
            style={{ top: `${position.top}px`, left: `${position.left}px` }}
            onClick={handleClick}
            onMouseDown={(e) => e.stopPropagation()} // Prevent hiding on click
        >
            <AddIcon />
            <span>添加</span>
        </ButtonWrapper>
    );
};

const popUp = keyframes`
    from {
        transform: translate(-50%, 10px);
        opacity: 0;
    }
    to {
        transform: translate(-50%, 0);
        opacity: 1;
    }
`;

const ButtonWrapper = styled.button`
    position: absolute;
    z-index: 1100;
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.colors.header};
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.3rem 0.8rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.9rem;
    font-weight: 600;
    animation: ${popUp} 0.2s ease-out;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #3c4a5c;
    }

    svg {
        width: 16px;
        height: 16px;
    }
`;

export default SelectionAddButton;