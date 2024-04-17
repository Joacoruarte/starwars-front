import { CharacterResponse } from '@/app/characters/models/character.t';
import { getCharacters } from '@/app/characters/services/character.service';
import { FilmResponse } from '@/app/films/models/film.t';
import { getFilms } from '@/app/films/services/film.service';
import { PlanetResponse } from '@/app/planets/models/planet.t';
import { getPlanets } from '@/app/planets/services/planet.service';
import { StarshipResponse } from '@/app/starships/models/starship.t';
import { getStarships } from '@/app/starships/service/starship.service';
import { Entity } from '@/models/enums/entity.enum';

interface GetEntitysDataProps {
  entity: Entity;
  page: string;
  search?: string;
  controller?: AbortController;
}

interface GetDataFromEntityProps {
  page: string;
  search?: string;
  controller?: AbortController;
}

interface EntityMapper {
  [Entity.FILMS]: ({
    page,
    search,
    controller,
  }: GetDataFromEntityProps) => Promise<FilmResponse>;
  [Entity.CHARACTERS]: ({
    page,
    search,
    controller,
  }: GetDataFromEntityProps) => Promise<CharacterResponse>;
  [Entity.PLANETS]: ({
    page,
    search,
    controller,
  }: GetDataFromEntityProps) => Promise<PlanetResponse>;
  [Entity.STARSHIPS]: ({
    page,
    search,
    controller,
  }: GetDataFromEntityProps) => Promise<StarshipResponse>;
}

type EntityResponse =
  | FilmResponse
  | CharacterResponse
  | PlanetResponse
  | StarshipResponse;

export const getEntitysData = async ({
  entity,
  page,
  search,
  controller,
}: GetEntitysDataProps): Promise<EntityResponse> => {
  const entityMapper: EntityMapper = {
    [Entity.FILMS]: getFilms,
    [Entity.CHARACTERS]: getCharacters,
    [Entity.PLANETS]: getPlanets,
    [Entity.STARSHIPS]: getStarships,
  };

  const data = await entityMapper[entity]({ page, search, controller });
  return data;
};
