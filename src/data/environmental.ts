// This file was previously a placeholder. Content has been added to resolve module import errors.
import React from 'react';
import { WordList } from '../types';
import {
    EnvironmentalTopicIllustration,
    WordIllustrationCard, RecycleIcon, PollutionIcon, PlanetIcon, SolarIcon
} from '../components/Illustrations';

export const environmentalWordList: WordList = {
  id: 'dse-environmental',
  title: 'DSE口语 - 环保类',
  description: '探讨环境保护、污染和可持续发展。',
  illustration: EnvironmentalTopicIllustration,
  theme: 'learn',
  words: [
    { word: 'recycle', phonetic: '/ˌriːˈsaɪkl/', definition: '回收利用', example: 'We should recycle paper, plastic, and glass to protect the environment.', illustration: () => React.createElement(WordIllustrationCard, { text: "回收", colors: ['#27AE60', '#2ECC71'], icon: React.createElement(RecycleIcon) }) },
    { word: 'pollution', phonetic: '/pəˈluːʃn/', definition: '污染', example: 'Air pollution is a major problem in many industrial cities.', illustration: () => React.createElement(WordIllustrationCard, { text: "污染", colors: ['#7F8C8D', '#95A5A6'], icon: React.createElement(PollutionIcon) }) },
    { word: 'endangered', phonetic: '/ɪnˈdeɪndʒərd/', definition: '濒临灭绝的', example: 'Giant pandas are an endangered species.', illustration: () => React.createElement(WordIllustrationCard, { text: "濒危", colors: ['#E74C3C', '#C0392B'], icon: React.createElement(PlanetIcon) }) },
    { word: 'renewable', phonetic: '/rɪˈnuːəbl/', definition: '可再生的', example: 'Solar power is a form of renewable energy.', illustration: () => React.createElement(WordIllustrationCard, { text: "可再生", colors: ['#F1C40F', '#F39C12'], icon: React.createElement(SolarIcon) }) },
  ],
};