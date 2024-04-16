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
    <input
      type='search'
      placeholder={placeholder}
      className='bg-white py-2 rounded-md px-4 text-black'
      onChange={handleChange}
    />
  );
}
