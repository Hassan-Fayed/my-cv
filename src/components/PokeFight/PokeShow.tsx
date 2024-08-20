'use client';

import { useEffect } from 'react';

import { usePokemonContext } from '@/context/pokemonContext';
import PokeControls from "./PokeControls";
import PokeImageShow from "./PokeImageShow";
import SearchInput from "./SearchInput/SearchInput";

interface PokeShowProps {
    position: 'left' | 'right';
}

export default function PokeShow({ position }: PokeShowProps) {
    const { leftPokemon, rightPokemon } = usePokemonContext();

    const { pokemon } = position === 'left' ? { pokemon: leftPokemon } : { pokemon: rightPokemon };

    return <div className={`
        h-full 
        w-[67%] 
        flex 
        flex-col 
        ${position === 'left' ? 'justify-between' : 'justify-between'}
    `}>
        <SearchInput
            inputUniqueId={position === 'left' ? 'search-pokemon-left' : 'search-pokemon-right'}
            className='w-full'
            position={position}
        />
        {pokemon && <div className={`
            w-[20rem] 
            flex 
            flex-col 
            ${position === 'left' ? 'self-start mb-5' : 'self-end mb-14'}
        `}>
            {position === 'left' && <PokeControls position='left' />}
            <PokeImageShow position={position} />
            {position === 'right' && <PokeControls position='right' />}
        </div>}
    </div>;
}