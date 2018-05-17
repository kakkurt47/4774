import {SheetMusic} from '../models/sheet-music';
import {ArtistsMock} from './artists';

export const SheetsMock: SheetMusic[] = [
  {
    title: 'Sheet Music',
    price: 120,
    views: 34,
    likes: 6,
    artist: ArtistsMock[2]
  },
  {
    title: 'First Song',
    price: 300,
    views: 41,
    likes: 13,
    artist: ArtistsMock[1]
  },
  {
    title: 'Your Names',
    price: 240,
    views: 43,
    likes: 10,
    artist: ArtistsMock[3]
  },
  {
    title: 'My Names',
    price: 210,
    views: 6,
    likes: 9,
    artist: ArtistsMock[3]
  },
];
