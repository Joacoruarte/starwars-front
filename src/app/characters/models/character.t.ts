import { Film } from "@/app/films/models/film.t";
import { Starship } from "@/app/starships/models/starship.t";

export interface Character {
    id: string;
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[] | Film[];
    species: string[];
    vehicles: string[];
    starships: string[] | Starship[];
    created: string;
    edited: string;
    url: string;
}

export interface CharacterResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Character[];
}

export interface CharactersHistory {
    count: number;
    characters: Character[][];
}