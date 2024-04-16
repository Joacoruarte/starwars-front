'use client';
import ListOfItems from '@/components/ListOfItems';
import { useStarWarsContextTyped } from '@/provider/starwars.hook';
import { Planet } from '../models/planet.t';
import PlanetCard from './PlanetCard';
import PlanetsFilters from './PlanetsFilters';
import { poppins } from '@/app/fonts';

export default function Planets() {
  const planetsData = useStarWarsContextTyped<Planet>();
  const planetsResults = planetsData.data.count;
  const pageCount = Math.ceil(planetsResults / planetsData.itemsPerPage);

  return (
    <div className={`${poppins.className} flex flex-col gap-4 w-full`}>
      <PlanetsFilters />

      <ListOfItems
        pageHistory={planetsData.data}
        onGetData={planetsData.fetchDataByPage}
        loading={planetsData.loading}
        pageCount={pageCount}
      >
        {planetsData.data.results[planetsData.currentPage].map((starship) => (
          <PlanetCard
            key={starship?.id}
            id={starship?.id}
            name={starship?.name}
            climate={starship?.climate}
            population={starship?.population}
            terrain={starship?.terrain}
          />
        ))}
      </ListOfItems>
    </div>
  );
}
