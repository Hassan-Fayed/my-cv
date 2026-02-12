import type { RefObject, JSX } from "react";

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

interface FetchPokemonReturn {
    isSuccess: boolean;
    pokemon: Pokemon | null;
    errMessage: string;
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

async function fetchPokemon(pokeName: string): Promise<FetchPokemonReturn> {
    if (pokeName.length < 3)    // because the shortest Pokemon name is of length 3
        return { isSuccess: false, pokemon: null, errMessage: 'The shortest Pokémon names are three letters long.' };

    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName.toLowerCase().replace(/ /g, '-')}`;

    try {
        const pokemon = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        });

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

        return { isSuccess: true, pokemon: pokemonUsedData, errMessage: '' };

    } catch (err) {
        return { isSuccess: false, pokemon: null, errMessage: `${pokeName}@${getRandomPokeName()}` }
    }
}

function getDebouncedFetchPokemon(pokeName: string, debounceTimeoutIdRef: RefObject<NodeJS.Timeout | null>) {
    return (): Promise<FetchPokemonReturn> => {
        return new Promise((resolve) => {
            if (debounceTimeoutIdRef.current) {
                clearTimeout(debounceTimeoutIdRef.current);
                debounceTimeoutIdRef.current = null;
            }

            debounceTimeoutIdRef.current = setTimeout(() => {
                const result = fetchPokemon(pokeName);
                resolve(result);

                // clear timeout to avoid memory leaks:
                if (debounceTimeoutIdRef.current) {
                    clearTimeout(debounceTimeoutIdRef.current);
                    debounceTimeoutIdRef.current = null;
                }
            }, 300);
        });
    }
}

function formatFetchPokeErrMessage(str: string): JSX.Element {
    if (str === 'The shortest Pokémon names are three letters long.') {
        return <>{str}</>;
    } else {
        const pokeNamesArr = str.split('@');
        return <>No pokemon is called <b className="break-all">{pokeNamesArr[0]}</b>. Please, try <b>{pokeNamesArr[1]}</b></>;
    }
}

export { getDebouncedFetchPokemon, formatFetchPokeErrMessage };
export type { Pokemon }