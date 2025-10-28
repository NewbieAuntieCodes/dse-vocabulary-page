// This file was previously a placeholder. Content has been added to resolve module import errors.
import React from 'react';
import { WordList } from '../types';
import { 
    GeneralTopicIllustration, 
    WordIllustrationCard, 
    BookIcon, 
    LeafIcon, 
    ScoreIcon, 
    BuildingIcon,
    RegularIcon,
    TournamentIcon,
    PrivacyIcon,
    CogIcon,
    ReleaseStressIcon
} from '../components/Illustrations';

export const generalWordList: WordList = {
  id: 'general-topics',
  title: '综合主题',
  description: '涵盖多个领域的常用词汇，适合游戏。',
  illustration: GeneralTopicIllustration,
  theme: 'learn',
  category: 'dse',
  words: [
    { word: 'knowledge', phonetic: '/ˈnɒlɪdʒ/', definition: '知识', example: 'Reading books is a great way to gain knowledge.', illustration: () => React.createElement(WordIllustrationCard, { text: "知识", colors: ['#3498DB', '#2980B9'], icon: React.createElement(BookIcon) }) },
    { word: 'curiosity', phonetic: '/ˌkjʊərɪˈɒsɪti/', definition: '好奇心', example: 'A sense of curiosity is essential for learning.', illustration: () => React.createElement(WordIllustrationCard, { text: "好奇心", colors: ['#9B59B6', '#8E44AD'], icon: React.createElement(LeafIcon) }) },
    { word: 'achievement', phonetic: '/əˈtʃiːvmənt/', definition: '成就', example: 'Winning the competition was a great achievement.', illustration: () => React.createElement(WordIllustrationCard, { text: "成就", colors: ['#F1C40F', '#F39C12'], icon: React.createElement(ScoreIcon) }) },
    { word: 'community', phonetic: '/kəˈmjuːnəti/', definition: '社区', example: 'Volunteering helps to build a strong community.', illustration: () => React.createElement(WordIllustrationCard, { text: "社区", colors: ['#2ECC71', '#27AE60'], icon: React.createElement(BuildingIcon) }) },
    { word: 'spacious', phonetic: '/ˈspeɪʃəs/', definition: '宽敞的', example: 'The hotel room was spacious and comfortable.', illustration: () => React.createElement(WordIllustrationCard, { text: "宽敞的", colors: ['#5DADE2', '#3498DB'], icon: React.createElement(BuildingIcon) }) },
    { word: 'annual', phonetic: '/ˈænjuəl/', definition: '每年的；年度的', example: 'The company holds an annual meeting every summer.', illustration: () => React.createElement(WordIllustrationCard, { text: "每年的", colors: ['#48C9B0', '#1ABC9C'], icon: React.createElement(RegularIcon) }) },
    { word: 'strategy', phonetic: '/ˈstrætədʒi/', definition: '策略；战略', example: 'We need to develop a clear strategy for our business.', illustration: () => React.createElement(WordIllustrationCard, { text: "策略", colors: ['#AF7AC5', '#9B59B6'], icon: React.createElement(TournamentIcon) }) },
    { word: 'insecure', phonetic: '/ˌɪnsɪˈkjʊər/', definition: '不安全的；没信心的', example: 'He felt insecure about his ability to do the job.', illustration: () => React.createElement(WordIllustrationCard, { text: "不安全的", colors: ['#7F8C8D', '#5D6D7E'], icon: React.createElement(PrivacyIcon) }) },
    { word: 'mature', phonetic: '/məˈtʃʊər/', definition: '成熟的', example: 'She is very mature for her age.', illustration: () => React.createElement(WordIllustrationCard, { text: "成熟的", colors: ['#58D68D', '#2ECC71'], icon: React.createElement(LeafIcon) }) },
    { word: 'practical', phonetic: '/ˈpræktɪkl/', definition: '实际的；实用的', example: 'We need a practical solution to this problem.', illustration: () => React.createElement(WordIllustrationCard, { text: "实用的", colors: ['#F39C12', '#E67E22'], icon: React.createElement(CogIcon) }) },
    { word: 'have huge influence on', phonetic: '/hæv hjuːdʒ ˈɪnfluəns ɒn/', definition: '对...有巨大影响', example: 'Social media can have a huge influence on young people.', illustration: () => React.createElement(WordIllustrationCard, { text: "巨大影响", colors: ['#EC7063', '#E74C3C'], icon: React.createElement(ReleaseStressIcon) }) },
  ],
};