'use client'

import { useState, useRef, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";

import TextInput from "@/components/TextInput/TextInput";
import List from "./List";
import debounce from '@/utils/debounce';
import fetchPokemon from '@/utils/fetchPokemon';
import { usePokemonContext } from "@/context/pokemonContext";
import type { Pokemon } from "@/utils/fetchPokemon";

interface SearchInputProps {
    className?: string;
    inputUniqueId: string;
    position: 'left' | 'right';
}

export default function SearchInput({
    className = '',
    inputUniqueId,
    position,
}: SearchInputProps) {
    const [term, setTerm] = useState('');
    const [foundPokemon, setFoundPokemon] = useState<Pokemon | null>(null);
    const [message, setMessage] = useState<React.ReactNode>(null);

    const { leftPokemon, setLeftPokemon, rightPokemon, setRightPokemon } = usePokemonContext();
    const { pokemon, setPokemon } = position === 'left' ?
        { pokemon: leftPokemon, setPokemon: setLeftPokemon } :
        { pokemon: rightPokemon, setPokemon: setRightPokemon };

    const debounceTimeoutId = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setMessage(null);

        if (term.length > 0)
            debounce(fetchPokemon.bind(null, term, setFoundPokemon, setMessage), debounceTimeoutId)();


        if (pokemon && pokemon.currHp <= 0)
            setPokemon(null);

    }, [term, pokemon, setPokemon]);

    const handleTermChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTerm(e.target.value);
        setFoundPokemon(null);
        setMessage('');
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (foundPokemon) {
            setPokemon(foundPokemon);
            setFoundPokemon(null);
            setTerm('');
        }
    };

    const handleListClick = () => {
        setPokemon(foundPokemon);
        setFoundPokemon(null);
        setTerm('');
    }

    return <div className={
        `relative 
        ${className}
        flex flex-col ${position === 'right' ? 'items-end' : ''} 
    `}>
        <TextInput
            value={term}
            labelText="Find Pokemon"
            onChange={handleTermChange}
            onSubmit={handleSubmit}
            inputUniqueId={inputUniqueId}
            parentFormClassName="z-10"
            maxLength={16}
            className={`
                ${term && message ? 'focus:!outline-brand-accent !border-brand-accent' : ''}
            `}
            inputFieldWidth="w-full"
            parentFontSize="text-[0.9em]"
        />
        {!!term && !!message &&
            <p className={`
                absolute ${position === 'left' ? 'left-[0]' : 'right-[0]'} top-[100%]
                text-brand-accent bg-brand-light
                w-full
                p-[0.375em] 
                text-[max(1em,0.75rem)]
            `}>
                {message}
            </p>
        }
        {!!foundPokemon && <List
            image={foundPokemon.frontImage}
            name={foundPokemon.name}
            handleListClick={handleListClick}
            setFoundPokemon={setFoundPokemon}
            position={position}
            className="
                z-0 w-full absolute top-[2.6em] left-[0]
                screen-s:top-[2.7em] 
                screen-xs:top-[2.9em]
            "
        />}
    </div>;
}