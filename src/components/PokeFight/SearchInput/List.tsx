'use client';

import { useEffect, useRef } from "react";
import type { Dispatch, SetStateAction, MouseEvent } from "react";

import Image from "next/image";
import type { Pokemon } from "@/utils/fetchPokemon";


interface ListPropsType {
    image: string;
    name: string;
    handleListClick: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
    setFoundPokemon: Dispatch<SetStateAction<Pokemon | null>>;
    className?: string;
    position: 'left' | 'right';
}


export default function List({
    image,
    name,
    handleListClick,
    setFoundPokemon,
    className = '',
    position,
}: ListPropsType) {
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: globalThis.MouseEvent) => {
            if (listRef.current && !listRef.current.contains(e.target as HTMLElement))
                setFoundPokemon(null);
        }

        document.addEventListener('click', handler, true);

        return document.removeEventListener('click', handler);
    }, [setFoundPokemon]);


    return <div ref={listRef} onClick={handleListClick} className={`
        animate-openDropdownList
        bg-brand-darkLight 
        flex items-center gap-[0.6em] 
        border border-brand-regular
        text-[max(1.5em,1rem)]
        hover:cursor-pointer hover:bg-brand-regular
        p-[0.3em]
        ${className}
    `}>
        <Image src={image} width={96} height={96} alt={`An Image of a ${name}`} className="
            w-[max(30%,0.5rem)] h-auto
            screen-xs:hidden
        " />
        <p className="capitalize">{name}</p>
    </div>;
}