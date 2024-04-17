import { Starship, StarshipResponse } from '../models/starship.t';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

interface GetStarshipsProps {
  page?: string;
  search?: string;
  controller?: AbortController;
}

export const getStarships = async ({
  page,
  search,
  controller,
}: GetStarshipsProps): Promise<StarshipResponse> => {
  try {
    const url = new URL(`${BASE_URL}/starships`);
    if (page) url.searchParams.append('page', page);
    if (search) url.searchParams.append('search', search);

    // AbortController is used to cancel the fetch request
    const options = controller ? { signal: controller.signal } : {};

    const response = await fetch(url.toString(), options);
    const data = await response.json();

    return data;
  } catch (error: DOMException | any) {
    if (error.name === 'AbortError') throw new Error('Request aborted');
    throw new Error(error.name);
  }
};

export const getStarshipById = async (id: string): Promise<Starship> => {
  const response = await fetch(`${BASE_URL}/starships/${id}/detail`);
  const data = await response.json();
  if (response.status === 404) {
    throw new Error('Starship not found');
  }
  return data;
};
