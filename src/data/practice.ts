import { WordList } from '../types';
import { PracticeTopicIllustration } from '../components/Illustrations';

export const practiceWordList: WordList = {
  id: 'comprehensive-practice',
  title: '综合练习',
  description: '选择一个词汇表，通过多种题型巩固记忆。',
  illustration: PracticeTopicIllustration,
  // Fix: The 'theme' property must be 'learn' or 'games' as defined in the WordList type.
  theme: 'learn',
  // Fix: Added missing 'category' property to satisfy the WordList type.
  category: 'practice',
  words: [],
};