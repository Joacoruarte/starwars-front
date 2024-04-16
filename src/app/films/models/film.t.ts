import { Character } from "@/app/characters/models/character.t";

export interface Film {
  id: string;
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[] | Character[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

export interface FilmResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Film[];
}
