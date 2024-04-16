'use client'
import { useStarWarsContextTyped } from '@/provider/starwars.hook';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { useEffect, useState } from 'react';

interface SearchInputProps {
  placeholder?: string;
  handleSearchValue: (value: string) => void;
  onSearchItems: (
    searchTerm: string,
    controller: AbortController
  ) => Promise<void>;
}

export default function SearchInput({
  placeholder = 'Buscar...',
  onSearchItems,
  handleSearchValue
}: SearchInputProps) {
  const starwarsData = useStarWarsContextTyped();
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    handleSearchValue(value);
    
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
    <div className='relative w-max'>
      {starwarsData.search.length === 0 && (
        <MagnifyingGlassIcon className='text-gray-300 absolute w-7 h-7 top-1/2 -translate-y-1/2 right-1'/>
      )}
      <input
        type='search'
        placeholder={placeholder}
        className='bg-white pl-4 pr-6 py-2 rounded-md text-black'
        onChange={handleChange}
      />
    </div>
  );
}
