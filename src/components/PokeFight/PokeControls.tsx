'use client';

import type { RefObject } from "react";
import { useRef, useEffect, useState } from "react";

import Button from "../Button";
import HPBar from "./HPBar";
import { usePokemonContext } from "@/context/pokemonContext";
import { pressStart2pFont } from '@/utils/fonts';

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
            if (currOpponentPoke) {
                const currHp = currOpponentPoke.currHp - currOpponentPoke.attack;

                if (currHp <= 0) return null;

                return {
                    ...currOpponentPoke,
                    currHp,
                };
            } else {
                return null;
            }

        });
    };

    return <>
        {pokemon &&
            <div className="flex flex-col gap-[0.4rem]">
                <h2 className={`${pressStart2pFont.className} capitalize text-[max(1.5em,0.75rem)] break-all`}>
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
    audioContextRef: RefObject<AudioContext | null>,
    audioBufferRef: RefObject<AudioBuffer | null>,
    path: string
) {
    if (!audioContextRef.current) return;

    const response = await fetch(path);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
    audioBufferRef.current = audioBuffer;
}

function playAudio(
    audioBufferRef: RefObject<AudioBuffer | null>,
    audioContextRef: RefObject<AudioContext | null>,
    time: number
) {
    if (!audioContextRef.current || !audioBufferRef.current) return;

    const bufferSource = audioContextRef.current.createBufferSource();
    bufferSource.buffer = audioBufferRef.current;

    const volume = audioContextRef.current.createGain();
    volume.gain.value = 1;

    bufferSource.connect(volume);
    volume.connect(audioContextRef.current.destination);
    bufferSource.start(time);
}