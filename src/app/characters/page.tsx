import { getSpecies } from '@/services/species.service';
import Characters from './components/Characters';
import { getCharacters } from './services/character.service';
import CharactersProvider from './provider/Characters.provider';
import ContainerCharacters from './components/ContainerCharacters';

export default async function CharactersPage() {
  const charactersResponse = await getCharacters({});
  const species = await getSpecies();

  return (
    <ContainerCharacters characters={charactersResponse} species={species} />
  );
}
