import { useState } from 'react';
import { Character, CharacterResponse } from '../models/character.t';
import { getCharacters } from '../services/character.service';

interface UseCharactersProps {
  defaultData: CharacterResponse;
  pageCount: number;
}

export const useCharacters = ({
  defaultData,
  pageCount,
}: UseCharactersProps) => {
  const [pageHistory, setPageHistory] = useState<Character[][]>([
    defaultData.results,
    ...new Array(pageCount - 1).fill([]),
  ]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCharactersByPage = async (page: string) => {
    if (pageHistory[Number(page) - 1]?.length > 0) return;
    setLoading(true);
    try {
      const response = await getCharacters({ page });
      if (response.results.length > 0) {
        setPageHistory((prevHistory) => {
            const newHistory = [...prevHistory];
            newHistory[Number(page) - 1] = response.results;
            return newHistory;
        });
      }
    } catch (error) {
      console.log('Error fetching characters', error);
      setError('Error fetching characters');
    } finally {
      setLoading(false);
    }
  };

  return {
    pageHistory,
    fetchCharactersByPage,
    loading,
    error,
  };
};
