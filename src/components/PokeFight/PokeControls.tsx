'use client';

import type { MutableRefObject } from "react";
import { useRef, useEffect, useState } from "react";

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

    const [isInitializing, setIsInitializing] = useState(true);

    const audioContextRef = useRef<AudioContext | null>(null);
    const attackAudioBufferRef = useRef<AudioBuffer | null>(null);

    useEffect(() => {
        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;

        (async function () {
            setIsInitializing(true);
            await createAudioBuffer(audioContextRef, attackAudioBufferRef, '/attack.mp3');
            setIsInitializing(false);
        })();
    }, []);


    const { pokemon, setPokemon } = position === 'left' ?
        { pokemon: leftPokemon, setPokemon: setLeftPokemon } :
        { pokemon: rightPokemon, setPokemon: setRightPokemon };

    const { opponentPokemon, setOpponentPokemon } = position === 'left' ?
        { opponentPokemon: rightPokemon, setOpponentPokemon: setRightPokemon } :
        { opponentPokemon: leftPokemon, setOpponentPokemon: setLeftPokemon };

    const handleAttackClick = () => {
        playAudio(attackAudioBufferRef, audioContextRef, 0);
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
                    disabled={isInitializing || !opponentPokemon}
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

async function createAudioBuffer(
    audioContextRef: MutableRefObject<AudioContext | null>,
    audioBufferRef: MutableRefObject<AudioBuffer | null>,
    path: string
) {
    if (!audioContextRef.current) return;

    const response = await fetch(path);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
    audioBufferRef.current = audioBuffer;
}

function playAudio(
    audioBufferRef: MutableRefObject<AudioBuffer | null>,
    audioContextRef: MutableRefObject<AudioContext | null>,
    time: number
) {
    if (!audioContextRef.current || !audioBufferRef.current) return;

    const bufferSource = audioContextRef.current.createBufferSource();
    bufferSource.buffer = audioBufferRef.current;

    const volume = audioContextRef.current.createGain();
    volume.gain.value = 0.5;

    bufferSource.connect(volume);
    volume.connect(audioContextRef.current.destination);
    bufferSource.start(time);
}