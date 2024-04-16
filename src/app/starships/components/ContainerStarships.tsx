'use client'
import { Entity } from '@/models';
import { StarWarsProvider } from '@/provider/StarWars.provider';
import { StarshipResponse } from '../models/starship.t';
import Starships from './Starships';

interface StarshipsProps {
  starships: StarshipResponse;
}

export default function ContainerStarships({ starships }: StarshipsProps) {
  
    return (
    <StarWarsProvider entity={Entity.STARSHIPS} defaultData={starships}>
      <Starships />
    </StarWarsProvider>
  );
}
