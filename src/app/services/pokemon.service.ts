import { Pokemon } from '../models/pokemon.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PokemonService {
    private pokemons: Pokemon[] = [];
    private _error: string = '';
    constructor(private readonly http: HttpClient){

    }

    public fetchPokemons(): void {
        this.http.get<Pokemon[]>('http://localhost:3000/users/')
        .subscribe((Pokemon: Pokemon[]) => {
            this.pokemons = Pokemon;
        }, (error: HttpErrorResponse) => {
            this._error = error.message;
        })
    }
    
    public getPokemons(): Pokemon[] {
        return this.pokemons;
    }
    
    public error(): string {
    return this._error;
    }

};
