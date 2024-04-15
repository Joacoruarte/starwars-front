import { useContext, useEffect, useState } from 'react';
import { CharactersContext } from '../provider/Characters.provider';

interface SearchInputProps {
  placeholder?: string;
  onSearchItems: (
    searchTerm: string,
    controller: AbortController
  ) => Promise<void>;
}

export default function SearchInput({
  placeholder = 'Buscar...',
  onSearchItems,
}: SearchInputProps) {
  const charactersData = useContext(CharactersContext);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    charactersData.handleSearch(value);
    
    if (abortController) {
      abortController.abort();
    }
    const controller = new AbortController();
    setAbortController(controller);
   
    try {
      await onSearchItems(value, controller);
    } catch (error: any) {
        console.error('Error occurred seaching characters:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [abortController]);

  return (
    <input
      type='search'
      placeholder={placeholder}
      className='bg-white py-2 rounded-md px-4 text-black'
      onChange={handleChange}
    />
  );
}
