// This file was previously a placeholder. Content has been added to resolve module import errors.
import React from 'react';
import { WordList } from '../types';
import { GeneralTopicIllustration, WordIllustrationCard, BookIcon, LeafIcon, ScoreIcon, BuildingIcon } from '../components/Illustrations';

export const generalWordList: WordList = {
  id: 'general-topics',
  title: '综合主题',
  description: '涵盖多个领域的常用词汇，适合游戏。',
  illustration: GeneralTopicIllustration,
  theme: 'learn',
  words: [
    { word: 'knowledge', phonetic: '/ˈnɒlɪdʒ/', definition: '知识', example: 'Reading books is a great way to gain knowledge.', illustration: () => React.createElement(WordIllustrationCard, { text: "知识", colors: ['#3498DB', '#2980B9'], icon: React.createElement(BookIcon) }) },
    { word: 'curiosity', phonetic: '/ˌkjʊərɪˈɒsɪti/', definition: '好奇心', example: 'A sense of curiosity is essential for learning.', illustration: () => React.createElement(WordIllustrationCard, { text: "好奇心", colors: ['#9B59B6', '#8E44AD'], icon: React.createElement(LeafIcon) }) },
    { word: 'achievement', phonetic: '/əˈtʃiːvmənt/', definition: '成就', example: 'Winning the competition was a great achievement.', illustration: () => React.createElement(WordIllustrationCard, { text: "成就", colors: ['#F1C40F', '#F39C12'], icon: React.createElement(ScoreIcon) }) },
    { word: 'community', phonetic: '/kəˈmjuːnəti/', definition: '社区', example: 'Volunteering helps to build a strong community.', illustration: () => React.createElement(WordIllustrationCard, { text: "社区", colors: ['#2ECC71', '#27AE60'], icon: React.createElement(BuildingIcon) }) },
  ],
};