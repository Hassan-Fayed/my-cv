'use client'

import { useState, useRef } from "react";
import type { ChangeEvent, SubmitEvent } from "react";

import TextInput from "@/components/TextInput/TextInput";
import List from "./List";
import { getDebouncedFetchPokemon, formatFetchPokeErrMessage } from '@/utils/fetchPokemon';
import { usePokemonContext } from "@/context/pokemonContext";
import type { Pokemon } from "@/utils/fetchPokemon";

interface SearchInputProps {
    className?: string;
    inputUniqueId: string;
    position: 'left' | 'right';
}

export default function SearchInput({
    className,
    inputUniqueId,
    position,
}: SearchInputProps) {
    const [term, setTerm] = useState('');
    const [foundPokemon, setFoundPokemon] = useState<Pokemon | null>(null);
    const [errMessage, setErrMessage] = useState('');

    const { leftPokemon, setLeftPokemon, rightPokemon, setRightPokemon } = usePokemonContext();
    const { pokemon, setPokemon } = position === 'left' ?
        { pokemon: leftPokemon, setPokemon: setLeftPokemon } :
        { pokemon: rightPokemon, setPokemon: setRightPokemon };

    const debounceTimeoutIdRef = useRef<NodeJS.Timeout | null>(null);

    const handleTermChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFoundPokemon(null);
        setErrMessage('');

        setTerm(e.target.value);

        const debouncedFetchPokemon = getDebouncedFetchPokemon(e.target.value, debounceTimeoutIdRef);
        debouncedFetchPokemon().then(result => {
            if (result.isSuccess) {
                setErrMessage('');
                setFoundPokemon(result.pokemon);
            } else {
                setErrMessage(result.errMessage);
            }
        });

    };

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
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
        flex flex-col ${position === 'right' ? 'items-end' : ''} 
        ${className ? className : ''}
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
                ${term && errMessage ? 'focus:!outline-brand-accent !border-brand-accent' : ''}
            `}
            inputFieldWidth="w-full"
            parentFontSize="text-[0.9em]"
        />
        {!!term && !!errMessage &&
            <p className={`
                absolute ${position === 'left' ? 'left-[0]' : 'right-[0]'} top-[100%]
                text-brand-accent bg-brand-light
                w-full
                p-[0.375em] 
                text-[max(1em,0.75rem)]
            `}>
                {formatFetchPokeErrMessage(errMessage)}
            </p>
        }
        {!!foundPokemon && <List
            image={foundPokemon.frontImage}
            name={foundPokemon.name}
            handleListClick={handleListClick}
            setFoundPokemon={setFoundPokemon}
            className="
                z-0 w-full absolute top-[2.6em] left-[0]
                max-screen-s:top-[2.7em] 
                max-screen-xs:top-[2.9em]
            "
        />}
    </div>;
}