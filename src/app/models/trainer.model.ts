import { Pokemon } from "./pokemon.model";

/**
 * Trainer Object with predefined variables to fill.
 * Includes Pokemon Interface.
 */
export interface Trainer {
    id: number;
    username: string;
    collection: Pokemon[]; // Array of Pokemon objects
}
