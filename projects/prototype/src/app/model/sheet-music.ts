import {Artist} from './artist';

export interface SheetMusic {
  title: string;
  price: number;
  views: number;
  likes: number;
  artist: Artist;
}
