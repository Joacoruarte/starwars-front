'use client';
import type { Character } from '../models/character.t';
import { Specie } from '@/models';
import { poppins } from '@/app/fonts';
import ListOfItems from '@/components/ListOfItems';
import CharacterFilters from './CharacterFilters';
import CharacterCard from './CharacterCard';
import { useStarWarsContextTyped } from '@/provider/starwars.hook';

interface CharactersProps {
  species: Specie[];
}

export default function Characters({ species }: CharactersProps) {
  const charactersData = useStarWarsContextTyped<Character>();
  const charactersResults = charactersData.data.count;
  const pageCount = Math.ceil(charactersResults / charactersData.itemsPerPage);

  return (
    <div className={`${poppins.className} flex flex-col gap-4 w-full`}>
      <CharacterFilters species={species} />

      <ListOfItems
        pageHistory={charactersData.data}
        onGetData={charactersData.fetchDataByPage}
        loading={charactersData.loading}
        pageCount={pageCount}
      >
        {charactersData.data.results?.[charactersData.currentPage]?.map(
          (character) => (
            <CharacterCard
              key={character?.id}
              id={character?.id}
              name={character?.name}
              height={character?.height}
              mass={character?.mass}
              gender={character?.gender}
              species={character?.species}
            />
          )
        )}
      </ListOfItems>
    </div>
  );
}
