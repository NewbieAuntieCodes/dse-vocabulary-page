import React from 'react';
import { WordList } from '../types';
import {
    // FIX: 'SkillsOpinionTopicIllustration' is not exported. Using the suggested 'SkillsTopicIllustration'.
    SkillsTopicIllustration,
    WordIllustrationCard,
    OpinionIcon,
    AgreeIcon,
    DisagreeIcon,
    PerspectiveIcon
} from '../components/Illustrations';

export const skillsOpinionWordList: WordList = {
  id: 'skills-opinion',
  title: '发表意见',
  description: '学习如何清晰、有力地表达你的观点和看法。',
  illustration: SkillsTopicIllustration,
  // FIX: The type '"games"' is not assignable to theme's type of '"learn" | "skills"'. Changed to 'skills'.
  theme: 'skills',
  category: 'skills',
  words: [
    {
      word: 'In my opinion',
      phonetic: '/ɪn maɪ əˈpɪnjən/',
      definition: '在我看来',
      example: 'In my opinion, the new policy will be very effective.',
      illustration: () => React.createElement(WordIllustrationCard, { text: "在我看来", colors: ['#5DADE2', '#3498DB'], icon: React.createElement(OpinionIcon) })
    },
    {
      word: 'I believe that',
      phonetic: '/aɪ bɪˈliːv ðæt/',
      definition: '我相信',
      example: 'I believe that everyone deserves a second chance.',
      illustration: () => React.createElement(WordIllustrationCard, { text: "我相信", colors: ['#48C9B0', '#1ABC9C'], icon: React.createElement(OpinionIcon) })
    },
    {
      word: 'From my perspective',
      phonetic: '/frɒm maɪ pərˈspektɪv/',
      definition: '从我的角度来看',
      example: 'From my perspective, the problem is more complex than it seems.',
      illustration: () => React.createElement(WordIllustrationCard, { text: "我的角度", colors: ['#AF7AC5', '#9B59B6'], icon: React.createElement(PerspectiveIcon) })
    },
    {
      word: 'I agree',
      phonetic: '/aɪ əˈɡriː/',
      definition: '我同意',
      example: 'I agree with you on that point.',
      illustration: () => React.createElement(WordIllustrationCard, { text: "我同意", colors: ['#58D68D', '#2ECC71'], icon: React.createElement(AgreeIcon) })
    },
    {
      word: 'I disagree',
      phonetic: '/aɪ ˌdɪsəˈɡriː/',
      definition: '我不同意',
      example: 'I disagree with the decision to close the library.',
      illustration: () => React.createElement(WordIllustrationCard, { text: "我不同意", colors: ['#EC7063', '#E74C3C'], icon: React.createElement(DisagreeIcon) })
    },
  ],
};
