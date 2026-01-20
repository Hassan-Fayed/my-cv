'use client';

import { usePokemonContext } from '@/context/pokemonContext';
import PokeControls from "./PokeControls";
import PokeImageShow from "./PokeImageShow";
import SearchInput from "./SearchInput/SearchInput";

interface PokeShowProps {
    position: 'left' | 'right';
    className: string;
}

export default function PokeShow({ position, className }: PokeShowProps) {
    const { leftPokemon, rightPokemon } = usePokemonContext();

    const pokemon = position === 'left' ? leftPokemon : rightPokemon;

    return <div className={`
        relative z-0
        flex flex-col
        ${className}
    `}>
        <SearchInput
            inputUniqueId={position === 'left' ? 'search-pokemon-left' : 'search-pokemon-right'}
            className='relative z-10'
            position={position}
        />
        {pokemon &&
            <div className={`
                w-full
                flex flex-col
                pt-[4rem]
                relative z-0
                ${position === 'left' ? 'self-start' : 'self-end'}
            `}>
                {position === 'left' && <PokeControls position='left' />}
                <PokeImageShow position={position} />
                {position === 'right' && <PokeControls position='right' />}
            </div>
        }
    </div>;
}