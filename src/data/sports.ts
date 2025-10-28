import React from 'react';
import { WordList } from '../types';
import {
    SportsTopicIllustration,
    WordIllustrationCard, StretchIcon, KickIcon, ScoreIcon, CatchIcon, CrawlIcon, HitIcon,
    OpponentIcon, RefereeIcon, TournamentIcon, MuscleIcon, DopamineIcon, EndorphinIcon, ReleaseStressIcon,
    HelmetIcon, RegularIcon, RoutineIcon, SelfDisciplineIcon
} from '../components/Illustrations';

export const sportsWordList: WordList = {
  id: 'dse-sports',
  title: 'DSE口语 - 运动类',
  description: '讨论各类体育活动和竞赛的常用词汇。',
  illustration: SportsTopicIllustration,
  theme: 'learn',
  category: 'dse',
  words: [
    { word: 'stretch', phonetic: '/stretʃ/', definition: '伸展，舒展', example: 'It\'s important to stretch before you exercise.', illustration: () => React.createElement(WordIllustrationCard, { text: "伸展", colors: ['#48C9B0', '#1ABC9C'], icon: React.createElement(StretchIcon) }) },
    { word: 'kick', phonetic: '/kɪk/', definition: '踢', example: 'He can kick the ball really hard.', illustration: () => React.createElement(WordIllustrationCard, { text: "踢", colors: ['#58D68D', '#2ECC71'], icon: React.createElement(KickIcon) }) },
    { word: 'score', phonetic: '/skɔːr/', definition: '得分', example: 'Our team needs to score another goal to win.', illustration: () => React.createElement(WordIllustrationCard, { text: "得分", colors: ['#F7DC6F', '#F1C40F'], icon: React.createElement(ScoreIcon) }) },
    { word: 'catch', phonetic: '/kætʃ/', definition: '接住', example: 'The player made an amazing catch to save the game.', illustration: () => React.createElement(WordIllustrationCard, { text: "接住", colors: ['#E59866', '#D35400'], icon: React.createElement(CatchIcon) }) },
    { word: 'crawl', phonetic: '/krɔːl/', definition: '爬行', example: 'He had to crawl through the tunnel.', illustration: () => React.createElement(WordIllustrationCard, { text: "爬行", colors: ['#AEB6BF', '#85929E'], icon: React.createElement(CrawlIcon) }) },
    { word: 'hit', phonetic: '/hɪt/', definition: '击打', example: 'She hit the ball over the net.', illustration: () => React.createElement(WordIllustrationCard, { text: "击打", colors: ['#EC7063', '#E74C3C'], icon: React.createElement(HitIcon) }) },
    { word: 'opponent', phonetic: '/əˈpoʊnənt/', definition: '对手', example: 'You should never underestimate your opponent.', illustration: () => React.createElement(WordIllustrationCard, { text: "对手", colors: ['#AF7AC5', '#8E44AD'], icon: React.createElement(OpponentIcon) }) },
    { word: 'referee', phonetic: '/ˌrefəˈriː/', definition: '裁判', example: 'The referee blew the whistle to stop the play.', illustration: () => React.createElement(WordIllustrationCard, { text: "裁判", colors: ['#5D6D7E', '#34495E'], icon: React.createElement(RefereeIcon) }) },
    { word: 'tournament', phonetic: '/ˈtʊrnəmənt/', definition: '锦标赛', example: 'Teams from all over the world compete in the tournament.', illustration: () => React.createElement(WordIllustrationCard, { text: "锦标赛", colors: ['#FAD7A0', '#F39C12'], icon: React.createElement(TournamentIcon) }) },
    { word: 'muscle', phonetic: '/ˈmʌsl/', definition: '肌肉', example: 'Lifting weights helps to build muscle.', illustration: () => React.createElement(WordIllustrationCard, { text: "肌肉", colors: ['#F1948A', '#D98880'], icon: React.createElement(MuscleIcon) }) },
    { word: 'dopamine', phonetic: '/ˈdoʊpəmiːn/', definition: '多巴胺', example: 'Exercise can increase the levels of dopamine in your brain.', illustration: () => React.createElement(WordIllustrationCard, { text: "多巴胺", colors: ['#5dade2', '#3498db'], icon: React.createElement(DopamineIcon) }) },
    { word: 'endorphin', phonetic: '/enˈdɔːrfɪn/', definition: '内啡肽', example: 'Running releases endorphins, which can make you feel happy.', illustration: () => React.createElement(WordIllustrationCard, { text: "内啡肽", colors: ['#48c9b0', '#1abc9c'], icon: React.createElement(EndorphinIcon) }) },
    { word: 'release', phonetic: '/rɪˈliːs/', definition: '释放', example: 'Physical activity is a good way to release stress.', illustration: () => React.createElement(WordIllustrationCard, { text: "释放", colors: ['#a569bd', '#8e44ad'], icon: React.createElement(ReleaseStressIcon) }) },
    { 
      word: 'helmet', 
      phonetic: '/ˈhelmɪt/', 
      definition: '头盔', 
      example: 'It\'s important to wear a helmet when you ride a bike.', 
      illustration: () => React.createElement(WordIllustrationCard, { text: "头盔", colors: ['#7F8C8D', '#95A5A6'], icon: React.createElement(HelmetIcon) }) 
    },
    { 
      word: 'regular', 
      phonetic: '/ˈreɡjələr/', 
      definition: '定期的；有规律的', 
      example: 'Regular exercise is good for your health.', 
      illustration: () => React.createElement(WordIllustrationCard, { text: "定期的", colors: ['#5dade2', '#3498db'], icon: React.createElement(RegularIcon) }) 
    },
    { 
      word: 'routine', 
      phonetic: '/ruːˈtiːn/', 
      definition: '常规；例行公事', 
      example: 'My morning routine includes jogging and a healthy breakfast.', 
      illustration: () => React.createElement(WordIllustrationCard, { text: "常规", colors: ['#1abc9c', '#16a085'], icon: React.createElement(RoutineIcon) }) 
    },
    { 
      word: 'self-discipline', 
      phonetic: '/ˌselfˈdɪsəplɪn/', 
      definition: '自律', 
      example: 'Becoming a professional athlete requires a lot of self-discipline.', 
      illustration: () => React.createElement(WordIllustrationCard, { text: "自律", colors: ['#9b59b6', '#8e44ad'], icon: React.createElement(SelfDisciplineIcon) }) 
    }
  ],
};