'use client';

import { useRef } from "react";

import Button from "../Button";
import HPBar from "./HPBar";
import { usePokemonContext } from "@/context/pokemonContext";

import { Press_Start_2P } from "next/font/google";
const pressStart2p = Press_Start_2P({ weight: "400", subsets: ["latin"] });

interface PokeControlsPropsType {
    position: 'left' | 'right';
}

export default function PokeControls({ position }: PokeControlsPropsType) {
    const { leftPokemon, setLeftPokemon, rightPokemon, setRightPokemon } = usePokemonContext();

    const attackSound = useRef<HTMLAudioElement | null>(null);
    if (attackSound.current === null && typeof Audio !== 'undefined') {
        attackSound.current = new Audio('/attack.mp3');
        attackSound.current.volume = 0.5;
    }


    const { pokemon, setPokemon } = position === 'left' ?
        { pokemon: leftPokemon, setPokemon: setLeftPokemon } :
        { pokemon: rightPokemon, setPokemon: setRightPokemon };

    const { opponentPokemon, setOpponentPokemon } = position === 'left' ?
        { opponentPokemon: rightPokemon, setOpponentPokemon: setRightPokemon } :
        { opponentPokemon: leftPokemon, setOpponentPokemon: setLeftPokemon };

    const handleAttackClick = () => {
        attackSound.current?.play();
        setOpponentPokemon((currOpponentPoke) => {
            if (currOpponentPoke)
                return {
                    ...currOpponentPoke,
                    currHp: currOpponentPoke.currHp - currOpponentPoke.attack,
                };
            else
                return null;
        });
    };

    return <>
        {pokemon &&
            <div className="flex flex-col gap-[0.4rem]">
                <h2 className={`${pressStart2p.className} capitalize text-[max(1.5em,0.75rem)] break-all`}>
                    {pokemon.name}
                </h2>
                <HPBar total={pokemon.hp} current={pokemon.currHp} />
                <Button
                    danger
                    disabled={!opponentPokemon}
                    className="self-end mt-[0.2em]"
                    onClick={handleAttackClick}
                    fontSize="text-[0.75rem]"
                >
                    Attack
                </Button>
            </div>
        }
    </>;
}