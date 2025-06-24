export interface Game {
  id: number;
  title: string;
  developer: string;
  price: number;
  rating: number;
  platforms: string[];
  genres: string[];
  languages: string[];
  coverImage: string;

  // ? indica que son opcionales
  releaseDate?: string;
  images?: string[];
  description?: string;
  requisitos?: string[];
  reviews?: {
    autor: string;
    comentario: string;
    rating: number;
  }[];
}
