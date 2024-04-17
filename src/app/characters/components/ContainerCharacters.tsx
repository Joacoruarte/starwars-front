import { Specie } from '@/models';
import { Entity } from '@/models/enums/entity.enum';
import { StarWarsProvider } from '@/provider/StarWars.provider';
import { CharacterResponse } from '../models/character.t';
import Characters from './Characters';

interface ContainerCharactersProps {
  characters: CharacterResponse;
  species: Specie[];
}

export default function ContainerCharacters({
  characters,
  species,
}: ContainerCharactersProps) {
  return (
    <StarWarsProvider entity={Entity.CHARACTERS} defaultData={characters}>
      <Characters species={species} />
    </StarWarsProvider>
  );
}
