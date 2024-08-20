'use client';

import { useRef } from "react";
import Image from "next/image";
import type { SyntheticEvent } from "react";

import { usePokemonContext } from "@/context/pokemonContext";

interface PokeImageShowProps {
    position: 'left' | 'right';
}

export default function PokeImageShow({ position }: PokeImageShowProps) {
    const { leftPokemon, rightPokemon } = usePokemonContext();

    const { name, image, cry } = position === 'left' ?
        { name: leftPokemon?.name, image: leftPokemon?.backImage, cry: leftPokemon?.cry } :
        { name: rightPokemon?.name, image: rightPokemon?.frontImage, cry: rightPokemon?.cry };

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(e.target as HTMLImageElement, 0, 0, canvasRef.current.width, canvasRef.current.height);

        if (cry) {
            const sound = new Audio(cry);
            sound.volume = 0.5;
            sound.play();
        }
    }

    return <>
        {name && image && <div className="relative">
            <Image
                className="w-full absolute top-[0] left-[0] z-0 opacity-0"
                src={image}
                alt={`An illustration of the pokemon ${name}`}
                width="96"
                height="96"
                onLoad={handleImageLoad}
            />
            <canvas
                ref={canvasRef}
                style={{ imageRendering: 'pixelated' }}
                className={`w-full relative z-10 ${position === 'left' ? 'mt-2' : 'mb-2'}`}
                width="96"
                height="96"
            ></canvas>
        </div>}
    </>;
}