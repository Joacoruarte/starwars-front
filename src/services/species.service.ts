import { Specie } from "@/models/interfaces/species.t"

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

export const getSpecies = async (): Promise<Specie[]> => {
    try {
        const response = await fetch(`${BASE_URL}/species`);
        const data: Specie[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching species', error);
        throw new Error('Error fetching species');
    }
}