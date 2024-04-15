import { Character } from "../models/character.t";

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

interface CharacterResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Character[];
}

interface GetCharactersProps {
    page?: string;
    search?: string;
    controller?: AbortController;
}

export const getCharacters = async ({ page, search, controller }: GetCharactersProps): Promise<CharacterResponse>  => {
    try {
        const url = new URL(`${BASE_URL}/people`);
        if (page) url.searchParams.append('page', page);
        if (search) url.searchParams.append('search', search);
        console.log(controller);
        const options = controller ? { signal: controller.signal } : {};
        const response = await fetch(url.toString(), options);
        const data = await response.json();
        return data;
    } catch (error: DOMException | any) {
        console.error('Error fetching characters', error);
        if (error.name === 'AbortError') {
            throw new Error('Request aborted');
        }
        
        throw new Error(error.name);
    }
}

export const getCharactersBySpecieId = async (id: string): Promise<{ count: number, results: Character[]}> => {
    try {
        const response = await fetch(`${BASE_URL}/species/${id}/people`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching characters by specie', error);
        throw new Error('Error fetching characters by specie');
    }
}

export const getCharacterById = async (id: string): Promise<Character> => {
    try {
        const response = await fetch(`${BASE_URL}/people/${id}`);
        const data = await response.json(); 
        if (response.status === 404) {
            throw new Error('Character not found');
        }               
        return data;
    } catch (error) { 
        throw error;
    }   
}