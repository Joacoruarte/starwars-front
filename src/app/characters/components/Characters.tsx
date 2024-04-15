'use client';
import { Poppins } from 'next/font/google';
import CharacterFilters from './CharacterFilters';
import ListOfCharacters from './ListOfCharacters';
import { useContext } from 'react';
import { CharactersContext } from '../provider/Characters.provider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export default function Characters({}) {
  const charactersData = useContext(CharactersContext);
  const charactersResults = charactersData.charactersHistory.count;
  const pageCount = Math.ceil(charactersResults / charactersData.itemsPerPage);

  return (
    <div className={`${poppins.className} flex flex-col gap-4 w-full`}>
      <CharacterFilters />

      <ListOfCharacters
        pageHistory={charactersData.charactersHistory}
        onGetCharacters={charactersData.fetchCharactersByPage}
        loading={charactersData.loadingCharacters}
        pageCount={pageCount}
      />
    </div>
  );
}
