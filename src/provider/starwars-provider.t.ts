import { Character } from "@/app/characters/models/character.t";
import { Film } from "@/app/films/models/film.t";
import { Planet } from "@/app/planets/models/planet.t";
import { Starship } from "@/app/starships/models/starship.t";

export type StarWarsEntity = Character | Film | Planet | Starship;

export interface StarWarsResponse<T extends StarWarsEntity> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[][];
}


export interface StarWarsContextProps<T extends StarWarsEntity> {
    loading: boolean;
    error: string | null;
    data: StarWarsResponse<T>;
    currentPage: number;
    itemsPerPage: number;
    fetchDataByPage: (page: string, search?: string) => void;
    handleSearch: (search: string) => void;
    search: string;
    handleCurrentPage: (page: number) => void;
    handleUpdateAllDataByFilter: (newData: StarWarsEntity[], count?: number) => void;
    handleLoading: (loading: boolean) => void;
    handleErrorMessage: (error: string) => void;
  }
  