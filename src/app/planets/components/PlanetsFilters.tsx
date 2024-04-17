'use client'
import { SearchInput } from "@/app/characters/components";
import { useStarWarsContextTyped } from "@/provider/starwars.hook";
import { Planet } from "../models/planet.t";
import { getPlanets } from "../services/planet.service";

export default function PlanetsFilters() {
  const planetsData = useStarWarsContextTyped<Planet>();

  const handleSearchPlanets = async (search: string, controller: AbortController) => {
    try {
        planetsData.handleCurrentPage(0);
        // change filter here
        if (controller.signal.aborted) {
          if (planetsData.loading) planetsData.handleLoading(false);
          return;
        }
        planetsData.handleLoading(true);      
        const response = await getPlanets({ search, controller });      
        planetsData.handleUpdateAllDataByFilter(response.results, response.count);
      } catch (error: any) {
        if ('message' in error && error.message === 'Request aborted') { 
          planetsData.handleLoading(true)
          planetsData.handleErrorMessage(error.message)
          return
        }
        planetsData.handleErrorMessage('Error fetching characters');
      } finally {
        if (!controller.signal.aborted) {
          planetsData.handleLoading(false);
        }
      }
  }
  
  return (
    <div className='flex flex-col gap-4'>
      <h4 className='text-xl font-[600]'>Planetas: {planetsData.data.count}</h4>


      <div className='flex items-center gap-4'>
        {/* <Filter
          items={species}
          itemsFilterTitle='Especies'
          onSelectItem={handleSelectSpecie}
          onOpenItemsDropdown={handleSpeciesDropdown}
          openItemsDropdown={openSpeciesDrowpDown}
          selectedItem={selectedSpecie}
          isFilterable={charactersData.search.length === 0}
          itemPropertyName='name'
        /> */}

        {/* SEARCHBAR */}
        <SearchInput 
          handleSearchValue={planetsData.handleSearch}
          onSearchItems={handleSearchPlanets}
          placeholder='Busca un planeta...'
        />
      </div>
    </div>
  )
}
