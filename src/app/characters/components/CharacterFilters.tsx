'use client';
import { Filter } from '@/components';
import { Specie } from '@/models';
import { useContext, useState } from 'react';
import { CharactersContext } from '../provider/Characters.provider';
import SearchInput from './SearchInput';

interface CharacterFiltersProps {
  //   species: Specie[];
}

export default function CharacterFilters({}: CharacterFiltersProps) {
  const charactersData = useContext(CharactersContext);
  const [openSpeciesDrowpDown, setOpenSpeciesDrowpDown] = useState(false);

  const handleSpeciesDropdown = (e?: React.MouseEvent<HTMLDivElement>) => {
    if (e) e.stopPropagation();
    setOpenSpeciesDrowpDown(!openSpeciesDrowpDown);
  };

  const handleSelectSpecie = async (specie?: Specie) => {
    if (!specie) {
      charactersData.handleSpecie('Todas');
      handleSpeciesDropdown();
      try {
        charactersData.fetchAllCharacters();
      } catch (error) {
        console.log('Error fetching characters');
      }
      return;
    }

    const { id, name } = specie;
    charactersData.handleSpecie(name);
    handleSpeciesDropdown();

    try {
      await charactersData.handleFilterCharactersBySpecie(id);
    } catch (error) {
      console.log('Error fetching characters by specie');
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <h4 className='text-xl font-[600]'>Filtros:</h4>

      <div className='flex items-center gap-4'>
        {/* SPECIES FILTER */}
        <Filter
          items={charactersData.species}
          itemsFilterTitle='Especies'
          onSelectItem={handleSelectSpecie}
          onOpenItemsDropdown={handleSpeciesDropdown}
          openItemsDropdown={openSpeciesDrowpDown}
          selectedItem={charactersData.selectedSpecie}
          isFilterable={charactersData.search.length === 0}
          itemPropertyName='name'
        />

        {/* SEARCHBAR */}
        <SearchInput 
          onSearchItems={charactersData.handleSearchCharacters}
          placeholder='Busca tu personaje...'
        />
      </div>
    </div>
  );
}
