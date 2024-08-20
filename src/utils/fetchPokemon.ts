import type { Dispatch, SetStateAction } from "react";

interface Pokemon {
    id: number;
    name: string;
    hp: number;
    currHp: number;
    attack: number;
    backImage: string;
    frontImage: string;
    cry: string;
}

export default async function fetchPokemon(
    name: string,
    setPokemon: Dispatch<SetStateAction<Pokemon | null>>,
    setMessage: Dispatch<SetStateAction<string>>,
) {
    const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;

    if (name.length < 1) return;

    const pokemon = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!pokemon.ok) {
        setMessage(`No pokemon is called "${name}". Please try Charmander, Bulbasaur, Squirtle, and more.`);
        return;
    }

    const pokemonData = await pokemon.json();

    const pokemonUsedData = {
        name: pokemonData.name,
        id: pokemonData.id,
        hp: pokemonData.stats[0].base_stat + pokemonData.stats[2].base_stat,
        currHp: pokemonData.stats[0].base_stat + pokemonData.stats[2].base_stat,
        attack: pokemonData.stats[1].base_stat,
        frontImage: pokemonData.sprites.front_default,
        backImage: pokemonData.sprites.back_default,
        cry: pokemonData.cries.legacy,
    };

    setMessage('');
    setPokemon(pokemonUsedData);
}

export type { Pokemon }