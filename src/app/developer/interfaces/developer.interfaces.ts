import type { Platform, Category, Language } from '../../shared/interfaces/game.interfaces';

export interface Game {
  id: string;
  developer_id: string | null;
  title: string;
  description: string;
  price: number;
  coverUrl: string;
  releaseDate: string;
  platforms: Platform[] | null;
  categories: Category[] | null;
  languages: Language[] | null;
  creationDate: string;
  updateDate: string;
}

export interface Developer {
  id: string;
  name: string;
  description: string;
  website: string;
  creationDate: string;
  country: string | null;
  games: Game[];
}
