'use client';
import {
  StarWarsResponse,
  StarWarsEntity,
} from '@/provider/starwars-provider.t';
import PlanetLoading from './PlanetLoading/PlanetLoading';
import ReactPaginate from 'react-paginate';
import { useStarWarsContextTyped } from '@/provider/starwars.hook';

interface ListOfItemsProps {
  pageHistory: StarWarsResponse<StarWarsEntity>;
  loading: boolean;
  pageCount: number;
  children: React.ReactNode;
  onGetData: (page: string, search?: string) => void;
}

export default function ListOfItems({
  children,
  loading,
  pageHistory,
  pageCount,
  onGetData,
}: ListOfItemsProps) {
  const charactersData = useStarWarsContextTyped();
  const isShowNextLabel =
    charactersData.currentPage === pageCount - 1 || pageCount === 1;
  const isShowPreviousLabel = charactersData.currentPage === 0;

  const handlePageClick = (selectedPage: number) => {
    charactersData.handleCurrentPage(selectedPage);
    if (pageHistory.results[selectedPage]?.length > 0) return;
    onGetData(`${selectedPage + 1}`, charactersData.search);
  };

  return (
    <div>
      {loading ? (
        <div className='grid place-content-center w-full h-[80dvh]'>
          <div className='-mt-[20rem]'>
            <PlanetLoading title='Cargando' />
          </div>
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
              {children}
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
        } gap-4 max-w-max mx-auto mt-4`}
      />
    </div>
  );
}
