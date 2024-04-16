import { Character } from "@/app/characters/models/character.t";
import { Film } from "@/app/films/models/film.t";

export interface Starship {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[] | Character[];
  films: string[] | Film[];
  created: string;
  edited: string;
  url: string;
}

export interface StarshipResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Starship[];
}
