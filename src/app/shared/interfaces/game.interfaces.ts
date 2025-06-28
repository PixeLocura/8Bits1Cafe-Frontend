export enum Category {
  ACTION = 'ACTION',
  ADVENTURE = 'ADVENTURE',
  RPG = 'RPG',
  STRATEGY = 'STRATEGY',
  SIMULATION = 'SIMULATION',
  SPORTS = 'SPORTS',
  RACING = 'RACING',
  PUZZLE = 'PUZZLE',
  PLATFORMER = 'PLATFORMER',
  SHOOTER = 'SHOOTER',
  HORROR = 'HORROR',
  CASUAL = 'CASUAL',
  FANTASY = 'FANTASY',
  ARCADE = 'ARCADE',
  ROGUELIKE = 'ROGUELIKE',
}

export const CategoryInfo: Record<Category, { name: string; description: string }> = {
  [Category.ACTION]: { name: 'Acción', description: 'Juegos rápidos centrados en el combate y el movimiento.' },
  [Category.ADVENTURE]: { name: 'Aventura', description: 'Juegos de exploración impulsados por la historia.' },
  [Category.RPG]: { name: 'RPG', description: 'Juegos de rol con desarrollo de personajes.' },
  [Category.STRATEGY]: { name: 'Estrategia', description: 'Juegos centrados en la toma de decisiones tácticas.' },
  [Category.SIMULATION]: { name: 'Simulación', description: 'Juegos que simulan actividades del mundo real.' },
  [Category.SPORTS]: { name: 'Deportes', description: 'Juegos competitivos basados en deportes.' },
  [Category.RACING]: { name: 'Carreras', description: 'Juegos de carreras de vehículos.' },
  [Category.PUZZLE]: { name: 'Puzzle', description: 'Juegos centrados en la resolución de problemas.' },
  [Category.PLATFORMER]: { name: 'Plataformas', description: 'Juegos que implican el movimiento de personajes a través de plataformas.' },
  [Category.SHOOTER]: { name: 'Shooter', description: 'Juegos de combate centrados en el uso de armas.' },
  [Category.HORROR]: { name: 'Horror', description: 'Juegos diseñados para crear miedo y tensión.' },
  [Category.CASUAL]: { name: 'Casual', description: 'Juegos simples y fáciles de jugar.' },
  [Category.FANTASY]: { name: 'Fantasía', description: 'Juegos ambientados en mundos mágicos o míticos.' },
  [Category.ARCADE]: { name: 'Arcade', description: 'Juegos rápidos que suelen encontrarse en arcades.' },
  [Category.ROGUELIKE]: { name: 'Roguelike', description: 'Juegos con niveles generados proceduralmente y muerte permanente.' },
};

export enum Language {
  EN = 'EN',
  ES = 'ES',
  FR = 'FR',
  DE = 'DE',
  IT = 'IT',
  PT = 'PT',
  RU = 'RU',
  JA = 'JA',
  ZH = 'ZH',
  KO = 'KO',
}

export const LanguageInfo: Record<Language, { name: string; native: string }> = {
  [Language.EN]: { name: 'Inglés', native: 'English' },
  [Language.ES]: { name: 'Español', native: 'Español' },
  [Language.FR]: { name: 'Francés', native: 'Français' },
  [Language.DE]: { name: 'Alemán', native: 'Deutsch' },
  [Language.IT]: { name: 'Italiano', native: 'Italiano' },
  [Language.PT]: { name: 'Portugués', native: 'Português' },
  [Language.RU]: { name: 'Ruso', native: 'Русский' },
  [Language.JA]: { name: 'Japonés', native: '日本語' },
  [Language.ZH]: { name: 'Chino', native: '中文' },
  [Language.KO]: { name: 'Coreano', native: '한국어' },
};

export enum Platform {
  WINDOWS = 'WINDOWS',
  MAC_OS = 'MAC_OS',
  LINUX = 'LINUX',
  ANDROID = 'ANDROID',
  IOS = 'IOS',
}

export const PlatformInfo: Record<Platform, { name: string }> = {
  [Platform.WINDOWS]: { name: 'Windows' },
  [Platform.MAC_OS]: { name: 'MacOS' },
  [Platform.LINUX]: { name: 'Linux' },
  [Platform.ANDROID]: { name: 'Android' },
  [Platform.IOS]: { name: 'iOS' },
};

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
