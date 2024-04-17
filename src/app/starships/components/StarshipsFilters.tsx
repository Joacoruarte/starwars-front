'use client'
import { SearchInput } from "@/app/characters/components";
import { useStarWarsContextTyped } from "@/provider/starwars.hook";
import { Starship } from "../models/starship.t";
import { getStarships } from "../service/starship.service";

export default function StarshipsFilters() {
  const starshipsData = useStarWarsContextTyped<Starship>();

  const handleSearchStarships = async (search: string, controller: AbortController) => {
    try {
        starshipsData.handleCurrentPage(0);
        // change filter here
        if (controller.signal.aborted) {
          if (starshipsData.loading) starshipsData.handleLoading(false);
          return;
        }
        starshipsData.handleLoading(true);      
        const response = await getStarships({ search, controller });      
        starshipsData.handleUpdateAllDataByFilter(response.results, response.count);
      } catch (error: any) {
        if ('message' in error && error.message === 'Request aborted') { 
          starshipsData.handleLoading(true)
          starshipsData.handleErrorMessage(error.message)
          return
        }
        starshipsData.handleErrorMessage('Error fetching characters');
      } finally {
        if (!controller.signal.aborted) {
          starshipsData.handleLoading(false);
        }
      }
  }
  
  return (
    <div className='flex flex-col gap-4'>
      <h4 className='text-xl font-[600]'>Naves: {starshipsData.data.count}</h4>

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
          handleSearchValue={starshipsData.handleSearch}
          onSearchItems={handleSearchStarships}
          placeholder='Busca una nave...'
        />
      </div>
    </div>
  )
}
