import { Film, FilmResponse } from "../models/film.t";

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

interface GetFilmsProps {
    page?: string;
    search?: string;
    controller?: AbortController;
}

export const getFilms = async ({ page, search, controller}:GetFilmsProps): Promise<FilmResponse> => {
    try {
        const url = new URL(`${BASE_URL}/films`);
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
}

export const getFilmById = async (id: string): Promise<Film> => {
    try {
        const response = await fetch(`${BASE_URL}/films/${id}/detail`);
        const data = await response.json();
        if (response.status === 404) {
            throw new Error('Film not found');
        }
        return data;
    } catch (error) {
        throw error;
    }
}