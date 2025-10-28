// This file was previously a placeholder. Content has been added to resolve module import errors.
import React from 'react';
import { WordList } from '../types';
import {
    CityTopicIllustration,
    WordIllustrationCard, BuildingIcon, MetroIcon, CrowdedIcon, CommuteIcon,
    InfrastructureIcon, SuburbIcon, AvenueIcon, CrossroadIcon, SquareIcon, CrosswalkIcon, TunnelIcon, NightlifeIcon
} from '../components/Illustrations';

export const cityWordList: WordList = {
  id: 'dse-city',
  title: 'DSE口语 - 城市生活',
  description: '关于城市设施、交通和生活的词汇。',
  illustration: CityTopicIllustration,
  theme: 'learn',
  category: 'dse',
  words: [
    { word: 'skyscraper', phonetic: '/ˈskaɪskreɪpər/', definition: '摩天大楼', example: 'Hong Kong is famous for its skyline filled with skyscrapers.', illustration: () => React.createElement(WordIllustrationCard, { text: "摩天大楼", colors: ['#5D6D7E', '#34495E'], icon: React.createElement(BuildingIcon) }) },
    { word: 'metropolis', phonetic: '/məˈtrɑːpəlɪs/', definition: '大都市', example: 'Tokyo is a bustling metropolis with millions of residents.', illustration: () => React.createElement(WordIllustrationCard, { text: "大都市", colors: ['#AF7AC5', '#8E44AD'], icon: React.createElement(MetroIcon) }) },
    { word: 'overcrowded', phonetic: '/ˌoʊvərˈkraʊdɪd/', definition: '过于拥挤的', example: 'The subway is often overcrowded during rush hour.', illustration: () => React.createElement(WordIllustrationCard, { text: "拥挤的", colors: ['#EC7063', '#E74C3C'], icon: React.createElement(CrowdedIcon) }) },
    { word: 'commute', phonetic: '/kəˈmjuːt/', definition: '通勤', example: 'My daily commute to work takes about an hour.', illustration: () => React.createElement(WordIllustrationCard, { text: "通勤", colors: ['#58D68D', '#2ECC71'], icon: React.createElement(CommuteIcon) }) },
    { word: 'infrastructure', phonetic: '/ˈɪnfrəstrʌktʃər/', definition: '基础设施', example: 'The city is investing in its infrastructure to support growth.', illustration: () => React.createElement(WordIllustrationCard, { text: '基础设施', colors: ['#7f8c8d', '#95a5a6'], icon: React.createElement(InfrastructureIcon) })},
    { word: 'downtown', phonetic: '/ˈdaʊntaʊn/', definition: '市中心', example: 'The downtown area is full of shops, restaurants, and theaters.', illustration: () => React.createElement(WordIllustrationCard, { text: '市中心', colors: ['#5D6D7E', '#34495E'], icon: React.createElement(BuildingIcon) })},
    { word: 'suburb', phonetic: '/ˈsʌbɜːrb/', definition: '郊区', example: 'Many families prefer to live in the suburbs where it\'s quieter.', illustration: () => React.createElement(WordIllustrationCard, { text: '郊区', colors: ['#27ae60', '#2ecc71'], icon: React.createElement(SuburbIcon) })},
    { word: 'avenue', phonetic: '/ˈævənuː/', definition: '大道', example: 'Fifth Avenue is a famous shopping street in New York.', illustration: () => React.createElement(WordIllustrationCard, { text: '大道', colors: ['#bdc3c7', '#95a5a6'], icon: React.createElement(AvenueIcon) })},
    { word: 'crossroad', phonetic: '/ˈkrɒsroʊd/', definition: '十字路口', example: 'Be careful when you are at a busy crossroad.', illustration: () => React.createElement(WordIllustrationCard, { text: '十字路口', colors: ['#f39c12', '#f1c40f'], icon: React.createElement(CrossroadIcon) })},
    { word: 'square', phonetic: '/skweər/', definition: '广场', example: 'People gathered in the town square for the festival.', illustration: () => React.createElement(WordIllustrationCard, { text: '广场', colors: ['#3498db', '#5dade2'], icon: React.createElement(SquareIcon) })},
    { word: 'crosswalk', phonetic: '/ˈkrɒswɔːk/', definition: '人行横道', example: 'Always use the crosswalk to cross the street safely.', illustration: () => React.createElement(WordIllustrationCard, { text: '人行横道', colors: ['#ecf0f1', '#bdc3c7'], icon: React.createElement(CrosswalkIcon) })},
    { word: 'tunnel', phonetic: '/ˈtʌnl/', definition: '隧道', example: 'The train goes through a long tunnel under the mountain.', illustration: () => React.createElement(WordIllustrationCard, { text: '隧道', colors: ['#34495e', '#2c3e50'], icon: React.createElement(TunnelIcon) })},
    { word: 'nightlife', phonetic: '/ˈnaɪtlaɪf/', definition: '夜生活', example: 'This city is known for its vibrant nightlife with many bars and clubs.', illustration: () => React.createElement(WordIllustrationCard, { text: '夜生活', colors: ['#9b59b6', '#8e44ad'], icon: React.createElement(NightlifeIcon) })},
  ],
};