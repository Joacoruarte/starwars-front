'use client';
import { Entity } from '@/models/enums/entity.enum';
import { getEntitysData } from '@/services/get-entity-data.service';
import React, { createContext, useState } from 'react';
import {
  StarWarsContextProps,
  StarWarsEntity,
  StarWarsResponse,
} from './starwars-provider.t';

export const StarWarsContext = createContext<
  StarWarsContextProps<StarWarsEntity>
>({} as StarWarsContextProps<StarWarsEntity>);

interface DefaultData {
  count: number;
  next: string | null;
  previous: string | null;
  results: StarWarsEntity[];
}

interface StarWarsProviderProps {
  children: React.ReactNode;
  entity: Entity;
  defaultData: DefaultData;
}

export const StarWarsProvider = ({
  children,
  entity,
  defaultData,
}: StarWarsProviderProps) => {
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');
  const [data, setData] = useState<StarWarsResponse<StarWarsEntity>>({
    count: defaultData.count,
    next: defaultData.next,
    previous: defaultData.previous,
    results: [
      defaultData.results,
      ...new Array(Math.ceil(defaultData.count / itemsPerPage - 1)).fill([]),
    ],
  });

  const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (search: string) => {
    setSearch(search);
  };

  const handleLoading = (loading: boolean) => {
    setLoading(loading);
  };

  const handleErrorMessage = (error: string) => {
    setError(error);
  };

  const fetchDataByPage = async (page: string, search?: string) => {
    try {
      handleLoading(true);
      const response = await getEntitysData({ entity: entity, page, search });
      if (response.results.length > 0) {
        setData((prevHistory) => {
          const newHistory = [...prevHistory.results];
          newHistory[Number(page) - 1] = response.results;
          return {
            ...prevHistory,
            results: newHistory,
          };
        });
      }
    } catch (error) {
      handleErrorMessage('Error fetching data');
    } finally {
      handleLoading(false);
    }
  };

  const handleUpdateAllDataByFilter = (
    newData: StarWarsEntity[],
    count?: number
  ) => {
    let dataPages;

    if (count) {
      dataPages = [
        newData,
        ...new Array(Math.ceil(count / itemsPerPage - 1)).fill([]),
      ];
    } else {
      dataPages = newData.reduce(
        (acc: StarWarsEntity[][], character: StarWarsEntity, index: number) => {
          const pageIndex = Math.floor(index / itemsPerPage);
          acc[pageIndex] = [...(acc[pageIndex] || []), character];
          return acc;
        },
        []
      );
    }

    setData({
      count: count ? count : newData.length,
      next: null,
      previous: null,
      results: dataPages,
    });
  };

  return (
    <StarWarsContext.Provider
      value={{
        loading,
        error,
        data,
        currentPage,
        itemsPerPage,
        search,
        fetchDataByPage,
        handleSearch,
        handleCurrentPage,
        handleUpdateAllDataByFilter,
        handleLoading,
        handleErrorMessage,
      }}
    >
      {children}
    </StarWarsContext.Provider>
  );
};
