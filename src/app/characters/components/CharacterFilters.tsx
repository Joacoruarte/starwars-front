'use client';
import { useState } from 'react';
import { Character } from '../models/character.t';
import SearchInput from './SearchInput';
import {
  getCharacters,
  getCharactersBySpecieId,
} from '../services/character.service';
import Filter from '@/components/Filter';
import { useStarWarsContextTyped } from '@/provider/starwars.hook';
import { Specie } from '../models/species.t';

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
      } catch (error: any) {
        if (error.name === 'AbortError') return
        charactersData.handleErrorMessage('Error fetching characters by specie');
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
      charactersData.handleErrorMessage('Error fetching characters by specie');
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
        charactersData.handleErrorMessage('')
        return;
      }
      charactersData.handleLoading(true);      
      const response = await getCharacters({ search, controller });      
      charactersData.handleUpdateAllDataByFilter(response.results, response.count);
    } catch (error: any) {
      if ('message' in error && error.message === 'Request aborted') { 
        charactersData.handleLoading(true)
        return
      }
      charactersData.handleErrorMessage('Error fetching characters');
    } finally {
      if (!controller.signal.aborted) {
        charactersData.handleLoading(false);
      }
    }
  }  

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-4'>
        <h4 className='text-xl font-[600]'>Personajes: {charactersData.data.count}</h4>

        <h5 className='text-xl underline underline-offset-4'>
          Filtros
        </h5>
      </div>

      <div className='flex flex-wrap items-center gap-4'>
        {/* SPECIES FILTER */}
        <Filter
          items={species}
          itemsFilterTitle='Especies'
          onSelectItem={handleSelectSpecie}
          onOpenItemsDropdown={handleSpeciesDropdown}
          openItemsDropdown={openSpeciesDrowpDown}
          selectedItem={selectedSpecie}
          isFilterable={charactersData.search.length === 0 && !charactersData.loading}
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
