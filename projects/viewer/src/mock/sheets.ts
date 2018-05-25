import {SheetMusic} from '@muzika/core';
import {ArtistsMock} from './artists';

export const SheetsMock: SheetMusic[] = [
  {
    sheetId: 1,
    title: 'Sheet Music',
    price: 120,
    author: ArtistsMock[2]
  },
  {
    sheetId: 2,
    title: 'First Song',
    price: 300,
    author: ArtistsMock[1]
  },
  {
    sheetId: 3,
    title: 'Your Names',
    price: 240,
    author: ArtistsMock[3]
  },
  {
    sheetId: 4,
    title: 'My Names',
    price: 210,
    author: ArtistsMock[3]
  },
];
