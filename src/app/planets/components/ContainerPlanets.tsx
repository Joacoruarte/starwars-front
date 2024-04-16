import { Entity } from '@/models';
import { StarWarsProvider } from '@/provider/StarWars.provider';
import { PlanetResponse } from '../models/planet.t';
import Planets from './Planets';

interface PlanetsProps {
  planets: PlanetResponse;
}

export default function ContainerPlanets({ planets }: PlanetsProps) {
  return (
    <StarWarsProvider entity={Entity.PLANETS} defaultData={planets}>
      <Planets />
    </StarWarsProvider>
  );
}
