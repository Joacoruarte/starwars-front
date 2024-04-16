import { Character } from "@/app/characters/models/character.t";
import { Film } from "@/app/films/models/film.t";

export interface Planet {
  id: string;
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[] | Character[];
  films: string[] | Film[];
  created: string;
  edited: string;
  url: string;
}

export interface PlanetResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
}
