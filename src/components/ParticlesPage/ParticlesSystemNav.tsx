'use client';

import type { ChangeEvent, MutableRefObject, FormEvent, RefObject } from 'react';
import { useState, useEffect, useRef } from 'react';

import { IoMdArrowDropleft } from "react-icons/io";
import { Press_Start_2P } from 'next/font/google';

import Particle from '@/utils/particlesSystem/particles';
import { startEffect } from '@/utils/particlesSystem/helperFunctions';
import IconLink from "@/components/IconLink";
import Button from "@/components/Button";
import pixelBall from '../../../public/pixelBall.png';
import MuteButton from '../MuteButton';

const pressStart2p = Press_Start_2P({ weight: "400", subsets: ["latin"] });

interface ParticlesSystemNavProps {
    navRef: RefObject<HTMLDivElement>;
    canvasRef: RefObject<HTMLCanvasElement>;
    ctxRef: MutableRefObject<CanvasRenderingContext2D | null>;
    particlesArrRef: MutableRefObject<Particle[]>;
}

export default function ParticlesSystemNav({ navRef, canvasRef, ctxRef, particlesArrRef }: ParticlesSystemNavProps) {
    const [isInitialized, setIsInitialized] = useState(false);
    const [term, setTerm] = useState('');
    const pxlBallImgElRef = useRef<HTMLImageElement | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const collisionAudioBufferRef = useRef<AudioBuffer | null>(null);

    useEffect(() => {
        const pxlBallImgEl = getPxlBallImgEl();
        const imgLoadHandler = () => setIsInitialized(true);
        pxlBallImgEl.addEventListener('load', imgLoadHandler);

        return () => pxlBallImgEl.removeEventListener('load', imgLoadHandler);
    }, []);

    const getPxlBallImgEl = () => {
        if (!pxlBallImgElRef.current) {
            const imgElement = new Image();
            imgElement.src = pixelBall.src;
            pxlBallImgElRef.current = imgElement;
        }
        return pxlBallImgElRef.current;
    };

    const getAudioContext = () => {
        if (!audioContextRef.current)
            audioContextRef.current = new AudioContext();
        return audioContextRef.current;
    }

    const getCollisionAudioBuffer = async (audioContext: AudioContext) => {
        if (!collisionAudioBufferRef.current) {
            const response = await fetch('/pluck.mp3');
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            collisionAudioBufferRef.current = audioBuffer;
        }

        return collisionAudioBufferRef.current;
    }

    const handleTermChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTerm(e.target.value);
    };

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!canvasRef.current || !term) return;

        const newParticle = new Particle(parseInt(term), canvasRef.current.width, canvasRef.current.height);
        particlesArrRef.current.push(newParticle);

        const pxlBallImgEl = getPxlBallImgEl();
        const audioContext = getAudioContext();
        getCollisionAudioBuffer(audioContext).then(collisionAudioBuffer => {
            startEffect(canvasRef, ctxRef, particlesArrRef.current, pxlBallImgEl, audioContext, collisionAudioBuffer);
        });

        setTerm('');
    }

    const handleMuteClick = () => {
        if (Particle.volumeValue) {  // truthy meaning it's not equal to zero
            Particle.volumeValue = 0;
        } else {
            Particle.volumeValue = 0.5;
        }
    }

    return <nav id="particles-nav" ref={navRef} className="
        bg-brand-regular
        h-[4.7rem] w-full
        relative
    ">
        <h1 className={`
            ${pressStart2p.className} text-[2rem] text-brand-extraLight
            w-full h-full
            flex justify-center items-center
            screen-s:text-[1.618rem]
            screen-ss:hidden
        `}>
            <span
                className="
                relative 
                screen-lg:right-[5.4rem]
                screen-slg:right-[6.4rem]
            "
            >Particles</span>
            <span
                className="
                    relative
                    screen-lg:right-[5.4rem]
                    screen-slg:right-[6.4rem]
                    screen-md:hidden
                "
            >&nbsp;System</span>
        </h1>
        <div className="
            w-full h-full
            absolute top-[0] left-[0]
            px-[2.168rem]
            screen-2xs:px-[1rem]
            screen-4xs:px-[0.5rem]
        ">
            <div className="
                max-w-projects-container-width h-full mx-auto
                flex justify-between items-center
                text-[1rem]
                screen-4xs:text-[0.9rem] 
            ">
                <div className="relative screen-4xs:gap-[0]">
                    <IconLink
                        isLinkingOutside={false}
                        color="text-brand-extraLight"
                        hoverColor="group-hover:text-brand-dark"
                        hoverBackgroundColor="hover:bg-brand-darkRegular"
                        hoverContainerDimensions="w-[2.9em] h-[2.9em]"
                        to="/"
                        fontSize="text-[3em]"
                    >
                        <IoMdArrowDropleft className="relative right-[0.05em]" />
                    </IconLink>
                    <MuteButton fontSize="1.5em" onChange={handleMuteClick} className="
                        absolute top-[4.7rem] left-0
                        w-[2.9em] h-[2.9em] rounded-[50%]
                        flex justify-center items-center
                        text-brand-light bg-brand-dark
                        hover:text-brand-dark hover:bg-brand-lightMedium
                    " />
                </div>
                <form onSubmit={handleFormSubmit}>
                    <fieldset className="flex gap-[1.25em] screen-3xs:gap-[1em]">
                        <input
                            disabled={!isInitialized}
                            max={70}
                            min={20}
                            value={term}
                            onChange={handleTermChange}
                            type="number"
                            placeholder="Enter a new diameter"
                            className="
                                text-[1em]
                                w-[13em]
                                pl-[0.5rem]
                                focus:outline-none 
                                focus:outline-brand-lightMedium
                                focus:outline-offset-[-1px]
                                focus:rounded-none
                                screen-3xs:w-[12.05em]
                                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                            "
                        />
                        <Button disabled={!isInitialized} regular type="submit">Add</Button>
                    </fieldset>
                </form>
            </div>
        </div>
    </nav>;
}