'use client';
import { Specie } from '@/models';
import { useState } from 'react';
import { Character } from '../models/character.t';
import SearchInput from './SearchInput';
import {
  getCharacters,
  getCharactersBySpecieId,
} from '../services/character.service';
import Filter from '@/components/Filter';
import { useStarWarsContextTyped } from '@/provider/starwars.hook';

interface CharacterFiltersProps {
  species: Specie[];
}

export default function CharacterFilters({ species }: CharacterFiltersProps) {
  const charactersData = useStarWarsContextTyped<Character>();
  const [openSpeciesDrowpDown, setOpenSpeciesDrowpDown] = useState(false);
  const [selectedSpecie, setSelectedSpecie] = useState('Todas');

  const handleSpeciesDropdown = (e?: React.MouseEvent<HTMLDivElement>) => {
    if (e) e.stopPropagation();
    setOpenSpeciesDrowpDown(!openSpeciesDrowpDown);
  };

  const handleSpecie = (specie: string) => {
    setSelectedSpecie(specie);
  };

  const handleSelectSpecie = async (specie?: Specie) => {
    if (!specie) {
      handleSpecie('Todas');
      handleSpeciesDropdown();
      charactersData.handleCurrentPage(0);
      charactersData.handleLoading(true);
      try {
        const response = await getCharacters({});
        charactersData.handleUpdateAllDataByFilter(response.results, response.count);
      } catch (error) {
        console.log('Error fetching characters');
      } finally {
        charactersData.handleLoading(false);
      }
      return;
    }

    const { id, name } = specie;
    handleSpecie(name);
    handleSpeciesDropdown();

    try {
      charactersData.handleLoading(true);
      charactersData.handleCurrentPage(0);
      const response = await getCharactersBySpecieId(id);
      charactersData.handleUpdateAllDataByFilter(response.results);
    } catch (error) {
      console.log('Error fetching characters by specie');
    } finally {
      charactersData.handleLoading(false);
    }
  };

  const handleSearchCharacters = async (search: string,  controller: AbortController) => {
    try {
      charactersData.handleCurrentPage(0);
      handleSpecie('Todos');
      if (controller.signal.aborted) {
        if (charactersData.loading) charactersData.handleLoading(false);
        return;
      }
      charactersData.handleLoading(true);      
      const response = await getCharacters({ search, controller });      
      charactersData.handleUpdateAllDataByFilter(response.results, response.count);
    } catch (error: any) {
      if ('message' in error && error.message === 'Request aborted') { 
        charactersData.handleLoading(true)
        charactersData.handleErrorMessage(error.message)
        return
      };
      charactersData.handleErrorMessage('Error fetching characters');
    } finally {
      if (!controller.signal.aborted) {
        charactersData.handleLoading(false);
      }
    }
  }  

  return (
    <div className='flex flex-col gap-4'>
      <h4 className='text-xl font-[600]'>Filtros:</h4>

      <div className='flex flex-wrap items-center gap-4'>
        {/* SPECIES FILTER */}
        <Filter
          items={species}
          itemsFilterTitle='Especies'
          onSelectItem={handleSelectSpecie}
          onOpenItemsDropdown={handleSpeciesDropdown}
          openItemsDropdown={openSpeciesDrowpDown}
          selectedItem={selectedSpecie}
          isFilterable={charactersData.search.length === 0}
          itemPropertyName='name'
        />

        {/* SEARCHBAR */}
        <SearchInput 
          handleSearchValue={charactersData.handleSearch}
          onSearchItems={handleSearchCharacters}
          placeholder='Busca tu personaje...'
        />
      </div>
    </div>
  );
}
