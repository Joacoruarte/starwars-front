'use client';
import { useContext } from 'react';
import { StarWarsContext } from './StarWars.provider';
import { StarWarsContextProps, StarWarsEntity } from './starwars-provider.t';

export const useStarWarsContextTyped = <
  T extends StarWarsEntity
>(): StarWarsContextProps<T> => {
  const context = useContext(StarWarsContext);
  return context as StarWarsContextProps<T>;
};
