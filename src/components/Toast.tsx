import React from 'react';
import { styled, keyframes } from 'styled-components';

interface ToastProps {
    message: string;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
    if (!message) return null;
    // 使用 message 作为 key，确保每次消息变化时组件都重新渲染并播放动画
    return <ToastWrapper key={message}>{message}</ToastWrapper>;
};

const fadeInOut = keyframes`
    0% { transform: translate(-50%, -100%); opacity: 0; }
    15% { transform: translate(-50%, 0); opacity: 1; }
    85% { transform: translate(-50%, 0); opacity: 1; }
    100% { transform: translate(-50%, -100%); opacity: 0; }
`;

const ToastWrapper = styled.div`
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.colors.header};
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 2000;
    font-size: 0.9rem;
    font-weight: 500;
    animation: ${fadeInOut} 3s ease-in-out forwards;
    white-space: nowrap;
`;

export default Toast;
