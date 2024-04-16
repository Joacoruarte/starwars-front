import React from 'react';
import Characters from './Characters';
import CharactersProvider from '../provider/Characters.provider';
import { CharacterResponse } from '../models/character.t';
import { Specie } from '@/models';
import { StarWarsProvider } from '@/provider/StarWars.provider';
import { Entity } from '@/models/enums/entity.enum';

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
