// This file was previously a placeholder. Content has been added to resolve module import errors.
import { WordList } from './types';
import { learningWordList } from './data/learning';
import { sportsWordList } from './data/sports';
import { environmentalWordList } from './data/environmental';
import { cityWordList } from './data/city';
import { generalWordList } from './data/general';
import { entertainmentWordList } from './data/entertainment';
import { workWordList } from './data/work';

export const wordLists: WordList[] = [
    learningWordList,
    sportsWordList,
    environmentalWordList,
    cityWordList,
    entertainmentWordList,
    workWordList,
    generalWordList,
];
