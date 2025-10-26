// This file was previously a placeholder. Content has been added to resolve module import errors.
import React from 'react';
import { WordList } from '../types';
import {
    WorkTopicIllustration,
    WordIllustrationCard,
    FirefighterIcon,
    ConstructionIcon,
    ColleagueIcon,
    EmployeeIcon,
    PromotionIcon
} from '../components/Illustrations';

export const workWordList: WordList = {
  id: 'dse-work',
  title: 'DSE口语 - 工作类',
  description: '讨论不同职业、工作环境和职业发展的词汇。',
  illustration: WorkTopicIllustration,
  theme: 'learn',
  words: [
    { 
      word: 'firefighter', 
      phonetic: '/ˈfaɪərfaɪtər/', 
      definition: '消防员', 
      example: 'Being a firefighter is a brave and demanding job.', 
      illustration: () => React.createElement(WordIllustrationCard, { text: "消防员", colors: ['#E74C3C', '#C0392B'], icon: React.createElement(FirefighterIcon) }) 
    },
    { 
      word: 'construction', 
      phonetic: '/kənˈstrʌkʃn/', 
      definition: '建造；建筑业', 
      example: 'The construction of the new bridge will take two years.', 
      illustration: () => React.createElement(WordIllustrationCard, { text: "建造", colors: ['#F39C12', '#E67E22'], icon: React.createElement(ConstructionIcon) }) 
    },
    { 
      word: 'colleague', 
      phonetic: '/ˈkɒliːɡ/', 
      definition: '同事', 
      example: 'I get along well with all of my colleagues at work.', 
      illustration: () => React.createElement(WordIllustrationCard, { text: "同事", colors: ['#3498DB', '#2980B9'], icon: React.createElement(ColleagueIcon) }) 
    },
    { 
      word: 'employee', 
      phonetic: '/ɪmˈplɔɪiː/', 
      definition: '雇员', 
      example: 'The company has over 500 employees.', 
      illustration: () => React.createElement(WordIllustrationCard, { text: "雇员", colors: ['#9B59B6', '#8E44AD'], icon: React.createElement(EmployeeIcon) }) 
    },
    { 
      word: 'promotion', 
      phonetic: '/prəˈmoʊʃn/', 
      definition: '晋升', 
      example: 'She worked hard and earned a promotion to manager.', 
      illustration: () => React.createElement(WordIllustrationCard, { text: "晋升", colors: ['#2ECC71', '#27AE60'], icon: React.createElement(PromotionIcon) }) 
    },
  ],
};
