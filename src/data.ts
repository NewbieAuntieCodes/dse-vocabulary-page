import React from 'react';
import { WordList } from './types';
import {
    SkillsTopicIllustration,
    WordIllustrationCard,
    OpinionIcon,
    AgreeIcon,
    DisagreeIcon,
    PerspectiveIcon,
    ExampleIcon,
    CompareIcon,
    SuggestIcon,
    FeelingsIcon,
    ClarifyIcon,
    StructureIcon,
    WeightIcon,
    CatchIcon,
    BatteryIcon,
    LeafIcon,
    ReleaseStressIcon,
    TournamentIcon,
    BuildingIcon
} from './components/Illustrations';

export const skillsUnit1: WordList = {
  id: 'skills-unit-1',
  title: 'Unit 1: 基础词汇与表达',
  description: '掌握日常交流、表达意见和讨论基本话题所需的核心词汇。',
  illustration: SkillsTopicIllustration,
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
      word: 'available',
      phonetic: '/əˈveɪləbl/',
      definition: '可获得的；有空的',
      example: 'The manager is not available for a meeting right now.',
      illustration: () => React.createElement(WordIllustrationCard, { text: "有空的", colors: ['#58D68D', '#2ECC71'], icon: React.createElement(AgreeIcon) }) 
    },
    {
      word: 'feedback',
      phonetic: '/ˈfiːdbæk/',
      definition: '反馈意见',
      example: 'We received a lot of positive feedback from our customers.',
      illustration: () => React.createElement(WordIllustrationCard, { text: "反馈", colors: ['#48C9B0', '#1ABC9C'], icon: React.createElement(OpinionIcon) })
    },
    { 
      word: 'pressure', 
      phonetic: '/ˈpreʃər/', 
      definition: '压力', 
      example: 'Students are under a lot of pressure to perform well.', 
      illustration: () => React.createElement(WordIllustrationCard, { text: "压力", colors: ['#34495E', '#2C3E50'], icon: React.createElement(WeightIcon) }) 
    },
    {
      word: 'receive',
      phonetic: '/rɪˈsiːv/',
      definition: '收到；接收',
      example: 'Did you receive my email?',
      illustration: () => React.createElement(WordIllustrationCard, { text: "收到", colors: ['#F39C12', '#E67E22'], icon: React.createElement(CatchIcon) })
    },
    { 
      word: 'recharge', 
      phonetic: '/ˌriːˈtʃɑːrdʒ/', 
      definition: '充电；恢复精力', 
      example: 'I need a weekend getaway to recharge my batteries.', 
      illustration: () => React.createElement(WordIllustrationCard, { text: "充电", colors: ['#27AE60', '#2ECC71'], icon: React.createElement(BatteryIcon) }) 
    },
    { 
      word: 'relaxation', 
      phonetic: '/ˌriːlækˈseɪʃn/', 
      definition: '放松；松弛', 
      example: 'Yoga is a great form of relaxation for the mind and body.', 
      illustration: () => React.createElement(WordIllustrationCard, { text: "放松", colors: ['#1ABC9C', '#16A085'], icon: React.createElement(LeafIcon) }) 
    },
    {
      word: 'relieve',
      phonetic: '/rɪˈliːv/',
      definition: '减轻；解除',
      example: 'This medicine will help relieve the pain.',
      illustration: () => React.createElement(WordIllustrationCard, { text: "减轻", colors: ['#EC7063', '#E74C3C'], icon: React.createElement(ReleaseStressIcon) })
    },
    { 
      word: 'schedule', 
      phonetic: '/ˈskedʒuːl/', 
      definition: '日程表；计划', 
      example: 'What\'s your schedule for next week?', 
      illustration: () => React.createElement(WordIllustrationCard, { text: "日程", colors: ['#FAD7A0', '#F39C12'], icon: React.createElement(TournamentIcon) }) 
    },
    {
      word: 'spacious',
      phonetic: '/ˈspeɪʃəs/',
      definition: '宽敞的',
      example: 'Their new house is very spacious.',
      illustration: () => React.createElement(WordIllustrationCard, { text: "宽敞的", colors: ['#5DADE2', '#3498DB'], icon: React.createElement(BuildingIcon) })
    },
    {
      word: 'stress',
      phonetic: '/stres/',
      definition: '压力；紧张',
      example: 'I\'m feeling a lot of stress from my exams.',
      illustration: () => React.createElement(WordIllustrationCard, { text: "紧张", colors: ['#7F8C8D', '#5D6D7E'], icon: React.createElement(WeightIcon) })
    }
  ],
};

export const skillsUnit2: WordList = {
  id: 'skills-unit-2',
  title: 'Unit 2: 同意与反对',
  description: '学习如何表达赞同、提出异议以及进行礼貌的辩论。',
  illustration: SkillsTopicIllustration,
  theme: 'skills',
  category: 'skills',
  words: [
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
    {
      word: 'That\'s a good point',
      phonetic: '/ðæts ə ɡʊd pɔɪnt/',
      definition: '说得好',
      example: 'That\'s a good point, I hadn\'t thought about it that way.',
      illustration: () => React.createElement(WordIllustrationCard, { text: "说得好", colors: ['#F39C12', '#E67E22'], icon: React.createElement(AgreeIcon) })
    },
  ],
};

export const skillsUnit3: WordList = {
  id: 'skills-unit-3',
  title: 'Unit 3: 举例说明',
  description: '学习如何通过具体的例子来支撑你的观点。',
  illustration: SkillsTopicIllustration,
  theme: 'skills',
  category: 'skills',
  words: [
    {
      word: 'For example',
      phonetic: '/fɔːr ɪɡˈzæmpl/',
      definition: '例如',
      example: 'Many countries, for example Sweden, have a high recycling rate.',
      illustration: () => React.createElement(WordIllustrationCard, { text: "例如", colors: ['#3498DB', '#2980B9'], icon: React.createElement(ExampleIcon) })
    },
    {
      word: 'For instance',
      phonetic: '/fɔːr ˈɪnstəns/',
      definition: '例如',
      example: 'Some hobbies are very relaxing. For instance, I enjoy painting.',
      illustration: () => React.createElement(WordIllustrationCard, { text: "例如", colors: ['#1ABC9C', '#16A085'], icon: React.createElement(ExampleIcon) })
    },
  ],
};

export const skillsUnit4: WordList = {
  id: 'skills-unit-4',
  title: 'Unit 4: 比较与对比',
  description: '学习如何有效地比较事物之间的异同。',
  illustration: SkillsTopicIllustration,
  theme: 'skills',
  category: 'skills',
  words: [
    {
      word: 'On the other hand',
      phonetic: '/ɒn ði ˈʌðər hænd/',
      definition: '另一方面',
      example: 'Living in the city is exciting. On the other hand, it can be very expensive.',
      illustration: () => React.createElement(WordIllustrationCard, { text: "另一方面", colors: ['#9B59B6', '#8E44AD'], icon: React.createElement(CompareIcon) })
    },
    {
      word: 'Similarly',
      phonetic: '/ˈsɪmələrli/',
      definition: '同样地',
      example: 'Cars cause pollution. Similarly, airplanes have a negative environmental impact.',
      illustration: () => React.createElement(WordIllustrationCard, { text: "同样地", colors: ['#34495E', '#2C3E50'], icon: React.createElement(CompareIcon) })
    },
  ],
};

export const skillsUnit5: WordList = {
  id: 'skills-unit-5',
  title: 'Unit 5: 提出建议',
  description: '学习如何给出建议和推荐。',
  illustration: SkillsTopicIllustration,
  theme: 'skills',
  category: 'skills',
  words: [
    {
      word: 'I suggest',
      phonetic: '/aɪ səˈdʒest/',
      definition: '我建议',
      example: 'I suggest we take a short break before continuing.',
      illustration: () => React.createElement(WordIllustrationCard, { text: "我建议", colors: ['#2ECC71', '#27AE60'], icon: React.createElement(SuggestIcon) })
    },
    {
      word: 'How about',
      phonetic: '/haʊ əˈbaʊt/',
      definition: '...怎么样？',
      example: 'How about going to the movies tonight?',
      illustration: () => React.createElement(WordIllustrationCard, { text: "...怎么样?", colors: ['#E67E22', '#D35400'], icon: React.createElement(SuggestIcon) })
    },
  ],
};

export const skillsUnit6: WordList = {
  id: 'skills-unit-6',
  title: 'Unit 6: 描述感受',
  description: '学习如何准确地描述你的情感和感受。',
  illustration: SkillsTopicIllustration,
  theme: 'skills',
  category: 'skills',
  words: [
    {
      word: 'I feel',
      phonetic: '/aɪ fiːl/',
      definition: '我感觉',
      example: 'I feel very happy about the good news.',
      illustration: () => React.createElement(WordIllustrationCard, { text: "我感觉", colors: ['#F1C40F', '#F39C12'], icon: React.createElement(FeelingsIcon) })
    },
    {
      word: 'It makes me feel',
      phonetic: '/ɪt meɪks mi fiːl/',
      definition: '这让我感觉',
      example: 'Listening to classical music makes me feel relaxed.',
      illustration: () => React.createElement(WordIllustrationCard, { text: "让我感觉", colors: ['#E74C3C', '#C0392B'], icon: React.createElement(FeelingsIcon) })
    },
  ],
};

export const skillsUnit7: WordList = {
  id: 'skills-unit-7',
  title: 'Unit 7: 请求澄清',
  description: '学习在不理解时如何礼貌地请求解释。',
  illustration: SkillsTopicIllustration,
  theme: 'skills',
  category: 'skills',
  words: [
    {
      word: 'Could you explain',
      phonetic: '/kʊd ju ɪkˈspleɪn/',
      definition: '你能解释一下吗',
      example: 'Could you explain what you mean by that?',
      illustration: () => React.createElement(WordIllustrationCard, { text: "能解释下吗", colors: ['#5DADE2', '#3498DB'], icon: React.createElement(ClarifyIcon) })
    },
    {
      word: 'I don\'t understand',
      phonetic: '/aɪ doʊnt ˌʌndərˈstænd/',
      definition: '我不明白',
      example: 'I\'m sorry, I don\'t understand the question.',
      illustration: () => React.createElement(WordIllustrationCard, { text: "我不明白", colors: ['#7F8C8D', '#5D6D7E'], icon: React.createElement(ClarifyIcon) })
    },
  ],
};

export const skillsUnit8: WordList = {
  id: 'skills-unit-8',
  title: 'Unit 8: 组织论点',
  description: '学习如何构建有条理的论点来支持你的讨论。',
  illustration: SkillsTopicIllustration,
  theme: 'skills',
  category: 'skills',
  words: [
    {
      word: 'Firstly',
      phonetic: '/ˈfɜːrstli/',
      definition: '首先',
      example: 'Firstly, I\'d like to thank everyone for coming.',
      illustration: () => React.createElement(WordIllustrationCard, { text: "首先", colors: ['#48C9B0', '#1ABC9C'], icon: React.createElement(StructureIcon) })
    },
    {
      word: 'In conclusion',
      phonetic: '/ɪn kənˈkluːʒn/',
      definition: '总而言之',
      example: 'In conclusion, I believe we should move forward with the plan.',
      illustration: () => React.createElement(WordIllustrationCard, { text: "总而言之", colors: ['#AF7AC5', '#9B59B6'], icon: React.createElement(StructureIcon) })
    },
  ],
};