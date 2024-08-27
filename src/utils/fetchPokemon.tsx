import type { Dispatch, SetStateAction, ReactNode } from "react";

interface Pokemon {
    id: number;
    name: string;
    hp: number;
    currHp: number;
    attack: number;
    backImage: string;
    frontImage: string;
    cry: HTMLAudioElement;
}

export default async function fetchPokemon(
    name: string,
    setPokemon: Dispatch<SetStateAction<Pokemon | null>>,
    setMessage: Dispatch<SetStateAction<ReactNode>>,
) {
    const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase().replace(/ /g, '-')}`;

    if (name.length < 1) return;

    const pokemon = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!pokemon.ok) {
        setMessage(<>
            No pokemon is called <b className="break-all">{name}</b>. Please, try <b>{getRandomPokeName()}</b>
        </>);
        return;
    }

    const pokemonData = await pokemon.json();

    const cry = pokemonData.cries.legacy ? pokemonData.cries.legacy : pokemonData.cries.latest

    const crySound = new Audio(cry);
    crySound.volume = 0.5;

    const backImage = pokemonData.sprites.back_default ?
        pokemonData.sprites.back_default :
        pokemonData.sprites.front_default;

    const pokemonUsedData = {
        name: pokemonData.name.replace(/-/g, ' '),
        id: pokemonData.id,
        hp: pokemonData.stats[0].base_stat + pokemonData.stats[2].base_stat,
        currHp: pokemonData.stats[0].base_stat + pokemonData.stats[2].base_stat,
        attack: pokemonData.stats[1].base_stat,
        frontImage: pokemonData.sprites.front_default,
        backImage,
        cry: crySound,
    };

    setMessage(null);
    setPokemon(pokemonUsedData);
}

function getRandomPokeName(): string {
    const names = [
        'Bulbasaur',
        'Charmander',
        'Squirtle',
        'Pidgey',
        'Pikachu',
        'Sandshrew',
        'Vulpix',
        'Jigglypuff',
        'Diglett',
        'Meowth',
        'Psyduck',
        'Mankey',
        'Growlithe',
        'Poliwhirl',
        'Abra',
        'Machop',
        'Geodude',
        'Ponyta',
        'Slowpoke',
        'Magnemite',
        'Doduo',
        'Electrode',
        'Cubone',
        'Hitmonchan',
        'Koffing',
        'Ekans',
        'Goldeen',
        'Staryu',
        'Mr Mime',
        'Scyther',
        'Jynx',
        'Magmar',
        'Magikarp',
        'Lapras',
        'Eevee',
        'Aerodactyl',
        'Snorlax',
        'Dragonite',
        'Mewtwo',
        'Mew',
        'Chikorita',
        'Cyndaquil',
        'Onix',
        'Haunter',
        'Krabby',
    ];

    const randomIdx: number = Math.floor(names.length * Math.random());

    return names[randomIdx];
}

export type { Pokemon }