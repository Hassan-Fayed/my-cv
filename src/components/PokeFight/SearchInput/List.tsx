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
}


export default function List({ image, name, handleListClick, setFoundPokemon }: ListPropsType) {
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: globalThis.MouseEvent) => {
            if (listRef.current && !listRef.current.contains(e.target as HTMLElement))
                setFoundPokemon(null);
        }

        document.addEventListener('click', handler, true);

        return document.removeEventListener('click', handler);
    }, [setFoundPokemon]);


    return <div ref={listRef} onClick={handleListClick} className="
        animate-openDropdownList
        bg-brand-darkLight 
        flex 
        gap-2
        items-center 
        border-brand-regular
        border
        text-2xl
        hover:cursor-pointer
        hover:bg-brand-regular
        w-full
        absolute
        z-20
        top-[4.5rem]
        left-[0]
        p-2
    ">
        <Image src={image} width={96} height={96} alt={`An Image of a ${name}`} />
        <p className="capitalize">{name}</p>
    </div>;
}