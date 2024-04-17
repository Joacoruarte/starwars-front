import { Planet, PlanetResponse } from '../models/planet.t';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

interface GetPlanetsProps {
  page?: string;
  search?: string;
  controller?: AbortController;
}

export const getPlanets = async ({
  page,
  search,
  controller,
}: GetPlanetsProps): Promise<PlanetResponse> => {
  try {
    const url = new URL(`${BASE_URL}/planets`);
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

export const getPlanetById = async (id: string): Promise<Planet> => {
  const response = await fetch(`${BASE_URL}/planets/${id}/detail`);
  const data = await response.json();
  if (response.status === 404) {
    throw new Error('Planet not found');
  }
  return data;
};
