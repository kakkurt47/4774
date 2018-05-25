import {SheetMusic} from '@muzika/core';
import {UsersMock} from './users';

export const SheetsMock: SheetMusic[] = [
  {
    sheetId: 1,
    title: 'Sheet Music',
    price: 120,
    author: UsersMock[2]
  },
  {
    sheetId: 2,
    title: 'First Song',
    price: 300,
    author: UsersMock[1]
  },
  {
    sheetId: 3,
    title: 'Your Names',
    price: 240,
    author: UsersMock[3]
  },
  {
    sheetId: 4,
    title: 'My Names',
    price: 210,
    author: UsersMock[3]
  },
];
