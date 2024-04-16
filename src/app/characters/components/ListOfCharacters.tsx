'use client';
import ReactPaginate from 'react-paginate';
import type { Character } from '../models/character.t';
import { StarWarsResponse } from '@/provider/starwars-provider.t';
import PlanetLoading from '@/components/PlanetLoading/PlanetLoading';
import CharacterCard from './CharacterCard';
import { useStarWarsContextTyped } from '@/provider/starwars.hook';
interface ListOfCharactersProps {
  pageHistory: StarWarsResponse<Character>;
  loading: boolean;
  onGetCharacters: (page: string, search?: string) => void;
  pageCount: number;
}

export default function ListOfCharacters({
  onGetCharacters,
  pageHistory,
  loading,
  pageCount,
}: ListOfCharactersProps) {
  const charactersData = useStarWarsContextTyped<Character>();
  const isShowNextLabel = charactersData.currentPage === (pageCount - 1) || pageCount === 1;
  const isShowPreviousLabel = charactersData.currentPage === 0;

  const handlePageClick = (selectedPage: number) => {
    charactersData.handleCurrentPage(selectedPage);
    if (pageHistory.results[selectedPage]?.length > 0) return;
    onGetCharacters(`${selectedPage + 1}`, charactersData.search);
  };

  return (
    <>
      {loading ? (
        <div className='grid place-content-center w-full h-[400px]'>
          <PlanetLoading title='Cargando' />
        </div>
      ) : (
        <>
          {pageHistory.results.flat().length === 0 ? (
            <div className='grid place-content-center w-full h-[400px]'>
              <h2 className='text-2xl text-center'>
                No se encontraron personajes.
              </h2>
            </div>
          ) : (
            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4'>
              {pageHistory.results[charactersData.currentPage]?.map(
                (character) => (
                  <CharacterCard
                    key={character?.id}
                    id={character?.id}
                    name={character?.name}
                    height={character?.height}
                    mass={character?.mass}
                    gender={character?.gender}
                    species={character?.species}
                  />
                )
              )}
            </section>
          )}
        </>
      )}
      <ReactPaginate
        breakLabel='...'
        nextLabel={isShowNextLabel ? '' : 'Next >'}
        previousLabel={isShowPreviousLabel ? '' : '< Previous'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        forcePage={charactersData.currentPage}
        pageRangeDisplayed={5}
        onPageChange={({ selected }) => handlePageClick(selected)}
        containerClassName='pagination'
        activeClassName='text-yellow-400'
        className={`${
          loading || pageCount <= 1 ? 'hidden' : 'flex'
        } gap-4 max-w-max mx-auto`}
      />
    </>
  );
}
