'use client';

import { createContext, useState, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";

import type { Pokemon } from "@/utils/fetchPokemon";

interface PokemonProviderProps {
    children: React.ReactNode
}

interface PokemonContextValue {
    leftPokemon: Pokemon | null;
    setLeftPokemon: Dispatch<SetStateAction<Pokemon | null>>;
    rightPokemon: Pokemon | null;
    setRightPokemon: Dispatch<SetStateAction<Pokemon | null>>;
}

const PokemonContext = createContext<PokemonContextValue | null>(null);

function PokemonProvider({ children }: PokemonProviderProps) {
    const [leftPokemon, setLeftPokemon] = useState<Pokemon | null>(null);
    const [rightPokemon, setRightPokemon] = useState<Pokemon | null>(null);

    const value = {
        leftPokemon,
        setLeftPokemon,
        rightPokemon,
        setRightPokemon,
    };

    return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
}

function usePokemonContext() {
    const pokemonContext = useContext(PokemonContext);

    if (!pokemonContext)
        throw new Error('usePokemonContext must be used inside PokemonProvider');

    return pokemonContext;
}

export { usePokemonContext, PokemonProvider };