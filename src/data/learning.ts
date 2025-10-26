import React from 'react';
import { WordList } from '../types';
import {
    LearningTopicIllustration,
    WordIllustrationCard, PlayIcon, BookIcon, BatteryIcon, WeightIcon, LeafIcon
} from '../components/Illustrations';

export const learningWordList: WordList = {
  id: 'dse-learning',
  title: 'DSE口语 - 学习类',
  description: '讨论学习、压力与放松相关话题的词汇。',
  illustration: LearningTopicIllustration,
  theme: 'learn',
  words: [
    { word: 'tutorial', phonetic: '/tuːˈtɔːriəl/', definition: '教程；辅导课', example: 'I watched an online tutorial to learn the software.', illustration: () => React.createElement(WordIllustrationCard, { text: "教程", colors: ['#8E44AD', '#9B59B6'], icon: React.createElement(PlayIcon) }) },
    { word: 'literacy', phonetic: '/ˈlɪtərəsi/', definition: '读写能力', example: 'The campaign aims to improve adult literacy.', illustration: () => React.createElement(WordIllustrationCard, { text: "读写能力", colors: ['#D2B48C', '#BC8F8F'], icon: React.createElement(BookIcon) }) },
    { word: 'recharge', phonetic: '/ˌriːˈtʃɑːrdʒ/', definition: '充电；恢复精力', example: 'I need a weekend getaway to recharge my batteries.', illustration: () => React.createElement(WordIllustrationCard, { text: "充电", colors: ['#27AE60', '#2ECC71'], icon: React.createElement(BatteryIcon) }) },
    { word: 'pressure', phonetic: '/ˈpreʃər/', definition: '压力', example: 'Students are under a lot of pressure to perform well.', illustration: () => React.createElement(WordIllustrationCard, { text: "压力", colors: ['#34495E', '#2C3E50'], icon: React.createElement(WeightIcon) }) },
    { word: 'relaxation', phonetic: '/ˌriːlækˈseɪʃn/', definition: '放松；松弛', example: 'Yoga is a great form of relaxation for the mind and body.', illustration: () => React.createElement(WordIllustrationCard, { text: "放松", colors: ['#1ABC9C', '#16A085'], icon: React.createElement(LeafIcon) }) }
  ],
};