import { StarWarsProvider } from '@/provider/StarWars.provider';
import { FilmResponse } from '../models/film.t';
import Films from './Films';
import { Entity } from '@/models';

interface ContainerFilmsProps {
  films: FilmResponse;
}

export default function ContainerFilms({ films }: ContainerFilmsProps) {
  return (
    <StarWarsProvider entity={Entity.FILMS} defaultData={films}>
      <Films />
    </StarWarsProvider>
  );
}
