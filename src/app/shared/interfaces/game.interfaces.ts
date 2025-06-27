export interface Game {
  id: string;
  developer_id: string;
  title: string;
  description: string;
  price: number;
  coverUrl: string;
  releaseDate: string;
  platforms: string[];
  categories: string[];
  languages: string[];
  creationDate: string;
  updateDate: string;
  images?: string[];
  rating?: number;
}
//SERA USADO PARA CONECTAR USER_ID con GAME_ID y
//extraer el username para mostrarlo en la infor de un juego
export interface GameConUsername extends Game {
  developerUsername: string;
}
