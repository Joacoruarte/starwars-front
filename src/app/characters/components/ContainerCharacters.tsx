import React from 'react';
import Characters from './Characters';
import CharactersProvider from '../provider/Characters.provider';
import { CharacterResponse } from '../models/character.t';
import { Specie } from '@/models';

interface ContainerCharactersProps {
  characters: CharacterResponse;
  species: Specie[];
}

export default function ContainerCharacters({
  characters,
  species,
}: ContainerCharactersProps) {
  return (
    <CharactersProvider characters={characters} species={species}>
      <Characters />
    </CharactersProvider>
  );
}
