export enum Platform {
  MAC_OS = 'MAC_OS',
  WINDOWS = 'WINDOWS'
}

export enum Category {
  ACTION = 'ACTION',
  ADVENTURE = 'ADVENTURE'
}

export enum Language {
  EN = 'EN',
  ES = 'ES',
  JA = 'JA'
}

export interface Game {
  id: string;
  developer_id: string;
  title: string;
  description: string;
  price: number;
  coverUrl: string;
  releaseDate: string;
  platforms: Platform[];
  categories: Category[];
  languages: Language[];
  creationDate: string;
  updateDate: string;
}
