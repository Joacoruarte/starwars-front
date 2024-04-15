'use client';
import { createContext, useState } from 'react';
import { Character, CharacterResponse } from '../models/character.t';
import {
  getCharacters,
  getCharactersBySpecieId,
} from '../services/character.service';
import { Specie } from '@/models';

interface CharactersHistory {
  count: number;
  characters: Character[][];
}

interface CharactersContextProps {
  charactersHistory: CharactersHistory;
  handleFilterCharactersBySpecie: (specieId: string) => Promise<void>;
  fetchCharactersByPage: (page: string) => void;
  species: Specie[];
  loadingCharacters: boolean;
  error: string | null;
  itemsPerPage: number;
  fetchAllCharacters: () => void;
  handleCurrentPage: (page: number) => void;
  currentPage: number;
  handleSearchCharacters: (search: string, controller: AbortController) => Promise<void>;
  handleSearch: (search: string) => void;
  search: string;
  handleSpecie: (specie: string) => void;
  selectedSpecie: string;
}

export const CharactersContext = createContext<CharactersContextProps>(
  {} as CharactersContextProps
);

interface CharactersProviderProps {
  children: React.ReactNode;
  characters: CharacterResponse;
  species: Specie[];
}

export default function CharactersProvider({
  children,
  characters,
  species,
}: CharactersProviderProps) {
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedSpecie, setSelectedSpecie] = useState('Todos');
  const [charactersHistory, setCharactersHistory] = useState<CharactersHistory>(
    {
      count: characters.count,
      characters: [
        characters.results,
        ...new Array(Math.ceil(characters.count / itemsPerPage - 1)).fill([]),
      ],
    }
  );

  const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (search: string) => {
    setSearch(search);
  }

  const handleSpecie = (specie: string) => {
    setSelectedSpecie(specie);
  }

  const handleFilterCharactersBySpecie = async (specieId: string) => {
    try {
      setLoading(true);
      setCurrentPage(0);
      const response = await getCharactersBySpecieId(specieId);
      const charactersPages = response.results.reduce(
        (acc: Character[][], character: Character, index: number) => {
          const pageIndex = Math.floor(index / itemsPerPage);
          acc[pageIndex] = [...(acc[pageIndex] || []), character];
          return acc;
        },
        []
      );
      setCharactersHistory({
        count: response.count,
        characters: charactersPages,
      });
    } catch (error) {
      console.log('Error fetching characters by specie', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCharactersByPage = async (page: string, search?: string) => {
    if (charactersHistory.characters[Number(page) - 1]?.length > 0) return;
    try {
      setLoading(true);
      const response = await getCharacters({ page, search });
      if (response.results.length > 0) {
        setCharactersHistory((prevHistory) => {
          const newHistory = [...prevHistory.characters];
          newHistory[Number(page) - 1] = response.results;
          return {
            ...prevHistory,
            characters: newHistory,
          };
        });
      }
    } catch (error) {
      console.log('Error fetching characters', error);
      setError('Error fetching characters');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllCharacters = async () => {
    try {
      setLoading(true);
      const response = await getCharacters({});
      setCharactersHistory({
        count: response.count,
        characters: [
          response.results,
          ...new Array(Math.ceil(response.count / itemsPerPage - 1)).fill([]),
        ],
      });
    } catch (error) {
      console.log('Error fetching characters', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchCharacters = async (search: string,  controller: AbortController) => {
    try {
      handleCurrentPage(0);
      handleSpecie('Todos');
      if (controller.signal.aborted) {
        if (loading) setLoading(false);
        return;
      }
      setLoading(true);      
      const response = await getCharacters({ search, controller });      
      const filledPages = response.results.length ? 
      new Array(Math.ceil(response.count / itemsPerPage - 1)).fill([])
      : []
      setCharactersHistory({
        count: response.count,
        characters: [
          response.results,
          ...filledPages,
        ],
      });
    } catch (error: any) {
      if ('message' in error && error.message === 'Request aborted') { 
        setLoading(true)
        setError(error.message)
        return
      };
      console.log('Error fetching characters', error);
      setError('Error fetching characters');
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }  
  
  return (
    <CharactersContext.Provider
      value={{
        charactersHistory,
        handleFilterCharactersBySpecie,
        fetchCharactersByPage,
        fetchAllCharacters,
        species,
        loadingCharacters: loading,
        error,
        itemsPerPage,
        handleCurrentPage,
        currentPage,
        handleSearchCharacters,
        handleSearch,
        search,
        handleSpecie,
        selectedSpecie
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
}
