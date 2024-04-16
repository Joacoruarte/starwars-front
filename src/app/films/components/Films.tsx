'use client';
import ListOfItems from '@/components/ListOfItems';
import { useStarWarsContextTyped } from '@/provider/starwars.hook';
import { Film } from '../models/film.t';
import FilmCard from './FilmCard';
import { poppins } from '@/app/fonts';

export default function Films() {
  const filmsData = useStarWarsContextTyped<Film>();
  const filmsResults = filmsData.data.count;
  const pageCount = Math.ceil(filmsResults / filmsData.itemsPerPage);

  return (
    <div className={`${poppins.className} flex flex-col gap-4 w-full`}>
      <ListOfItems
        pageHistory={filmsData.data}
        onGetData={filmsData.fetchDataByPage}
        loading={filmsData.loading}
        pageCount={pageCount}
      >
        {filmsData.data.results[filmsData.currentPage]?.map((film) => (
          <FilmCard
            key={film?.id}
            id={film?.id}
            title={film?.title}
            opening_crawl={film?.opening_crawl}
            release_date={film?.release_date}
          />
        ))}
      </ListOfItems>
    </div>
  );
}
