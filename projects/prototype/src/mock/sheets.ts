import {SheetMusic} from '@muzika/core';
import {UsersMock} from './users';

export const SheetsMock: SheetMusic[] = [
  {
    sheet_id: 1,
    title: 'Sheet Music',
    price: 120,
    author: UsersMock[2]
  },
  {
    sheet_id: 2,
    title: 'First Song',
    price: 300,
    author: UsersMock[1]
  },
  {
    sheet_id: 3,
    title: 'Your Names',
    price: 240,
    author: UsersMock[3]
  },
  {
    sheet_id: 4,
    title: 'My Names',
    price: 210,
    author: UsersMock[3]
  },
];
