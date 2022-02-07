/**
 * Pokemon Object with predefined variables to fill.
 */
export interface Pokemon {
    id: number; // Index in array (+1)
    name: string; // Pokemon name
    url: string; // URL to fetch additional pokemon data
    hasPokemon?: boolean; // If pokemon exists in collection.
}
