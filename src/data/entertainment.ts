// This file was previously a placeholder. Content has been added to resolve module import errors.
import React from 'react';
import { WordList } from '../types';
import {
    EntertainmentTopicIllustration,
    WordIllustrationCard, PrivacyIcon, CelebrityIcon, FameIcon
} from '../components/Illustrations';

export const entertainmentWordList: WordList = {
  id: 'dse-entertainment',
  title: 'DSE口语 - 娱乐类',
  description: '讨论名人文化、隐私和名望相关的话题。',
  illustration: EntertainmentTopicIllustration,
  theme: 'learn',
  category: 'dse',
  words: [
    { word: 'privacy', phonetic: '/ˈpraɪvəsi/', definition: '隐私', example: 'Celebrities often struggle to maintain their privacy.', illustration: () => React.createElement(WordIllustrationCard, { text: "隐私", colors: ['#5D6D7E', '#34495E'], icon: React.createElement(PrivacyIcon) }) },
    { word: 'celebrity', phonetic: '/səˈlebrəti/', definition: '名人', example: 'Many young people dream of becoming a celebrity.', illustration: () => React.createElement(WordIllustrationCard, { text: "名人", colors: ['#F1C40F', '#F39C12'], icon: React.createElement(CelebrityIcon) }) },
    { word: 'fame', phonetic: '/feɪm/', definition: '名声；名望', example: 'Fame can bring both fortune and problems.', illustration: () => React.createElement(WordIllustrationCard, { text: "名望", colors: ['#AF7AC5', '#8E44AD'], icon: React.createElement(FameIcon) }) },
  ],
};