import ContainerCharacters from './components/ContainerCharacters';
import { getCharacters } from './services/character.service';
import { getSpecies } from './services/species.service';

export default async function CharactersPage() {
  const charactersResponse = await getCharacters({});
  const species = await getSpecies();

  return (
    <ContainerCharacters characters={charactersResponse} species={species} />
  );
}
