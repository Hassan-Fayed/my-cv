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
    const [message, setMessage] = useState('');

    const { leftPokemon, setLeftPokemon, rightPokemon, setRightPokemon } = usePokemonContext();
    const { pokemon, setPokemon } = position === 'left' ?
        { pokemon: leftPokemon, setPokemon: setLeftPokemon } :
        { pokemon: rightPokemon, setPokemon: setRightPokemon };

    const debounceTimeoutId = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
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

    return <div className={'relative ' + className}>
        <TextInput
            value={term}
            labelText="Search for a Pokemon"
            inputFieldWidth="w-full"
            onChange={handleTermChange}
            onSubmit={handleSubmit}
            inputUniqueId={inputUniqueId}
        />
        {term && message && <p className="text-brand-accent mt-2">{message}</p>}
        {!!foundPokemon && <List
            image={foundPokemon.frontImage}
            name={foundPokemon.name}
            handleListClick={handleListClick}
            setFoundPokemon={setFoundPokemon}
        />}
    </div>;
}