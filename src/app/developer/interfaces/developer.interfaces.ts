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

export enum Country {
  US = 'US',
  ES = 'ES',
  MX = 'MX',
  AR = 'AR',
  BR = 'BR',
  CL = 'CL',
  CO = 'CO',
  PE = 'PE',
  UY = 'UY',
}

export const COUNTRY_INFO_MAP: Record<Country, { es: string; en: string; flag: string }> = {
  [Country.US]: { es: 'Estados Unidos', en: 'United States', flag: 'https://flagcdn.com/us.svg' },
  [Country.ES]: { es: 'España', en: 'Spain', flag: 'https://flagcdn.com/es.svg' },
  [Country.MX]: { es: 'México', en: 'Mexico', flag: 'https://flagcdn.com/mx.svg' },
  [Country.AR]: { es: 'Argentina', en: 'Argentina', flag: 'https://flagcdn.com/ar.svg' },
  [Country.BR]: { es: 'Brasil', en: 'Brazil', flag: 'https://flagcdn.com/br.svg' },
  [Country.CL]: { es: 'Chile', en: 'Chile', flag: 'https://flagcdn.com/cl.svg' },
  [Country.CO]: { es: 'Colombia', en: 'Colombia', flag: 'https://flagcdn.com/co.svg' },
  [Country.PE]: { es: 'Perú', en: 'Peru', flag: 'https://flagcdn.com/pe.svg' },
  [Country.UY]: { es: 'Uruguay', en: 'Uruguay', flag: 'https://flagcdn.com/uy.svg' },
};

export interface Developer {
  id: string;
  name: string;
  description: string;
  website: string;
  creationDate: string;
  country: Country | null;
  profilePictureUrl?: string | null; // Profile picture URL from backend
  games: Game[];
}
