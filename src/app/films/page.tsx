import ContainerFilms from './components/ContainerFilms';
import { getFilms } from './services/film.service';

export default async function FilmsPage() {
  const filmsResponse = await getFilms({});

  return <ContainerFilms films={filmsResponse} />;
}
