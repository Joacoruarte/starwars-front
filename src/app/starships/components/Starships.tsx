'use client';
import ListOfItems from '@/components/ListOfItems';
import { useStarWarsContextTyped } from '@/provider/starwars.hook';
import { Starship } from '../models/starship.t';
import StarshipCard from './StarshipCard';
import StarshipsFilters from './StarshipsFilters';
import { poppins } from '@/app/fonts';

export default function Starships() {
  const starshipsData = useStarWarsContextTyped<Starship>();
  const starshipsResults = starshipsData.data.count;
  const pageCount = Math.ceil(starshipsResults / starshipsData.itemsPerPage);

  return (
    <div className={`${poppins.className} flex flex-col gap-4 w-full`}>
      <StarshipsFilters />

      <ListOfItems
        pageHistory={starshipsData.data}
        onGetData={starshipsData.fetchDataByPage}
        loading={starshipsData.loading}
        pageCount={pageCount}
      >
        {starshipsData.data.results[starshipsData.currentPage].map(
          (starship) => (
            <StarshipCard
              key={starship?.id}
              id={starship?.id}
              name={starship?.name}
              model={starship?.model}
              manufacturer={starship?.manufacturer}
              cargo_capacity={starship?.cargo_capacity}
              cost_in_credits={starship?.cost_in_credits}
            />
          )
        )}
      </ListOfItems>
    </div>
  );
}
