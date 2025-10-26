
// Import React to provide the React namespace for types like React.FC.
import React from 'react';

export type Page = 'home' | 'learn' | 'practice' | 'games' | 'my-words';

export interface Word {
  word: string;
  phonetic: string;
  definition: string;
  example: string;
  illustration?: React.FC;
}

export interface WordList {
  id: string;
  title: string;
  description: string;
  words: Word[];
  illustration: React.FC;
  theme: 'learn' | 'practice' | 'games';
}