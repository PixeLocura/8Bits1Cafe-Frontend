export type Platform = String;

export type Category = String;

export type Language = String;

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
