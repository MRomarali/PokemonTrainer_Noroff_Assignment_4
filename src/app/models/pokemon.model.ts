import { PokemonSprite } from './pokemon-sprite.model';

export interface Pokemon {
    id?: number;
    name: string;
    url: string;
    abilities?: any[];
    baseExperience?: number;
    forms?: any;
    moves?: any[];
    sprites?: PokemonSprite;
    stats?: any[];
    height?: number;
    weight?: number;
    types?: any[];
}
