'use client';

import { useRef, useEffect, useState } from "react";
import type { ChangeEvent, Dispatch, SetStateAction, MutableRefObject, FormEvent } from "react";

import Button from '@/components/Button';
import SmallRoundButton from "../SmallRoundButton";

interface CounterUIProp {
    term: number;
    setTerm: Dispatch<SetStateAction<number>>;
    isCounting: boolean;
    setIsCounting: Dispatch<SetStateAction<boolean>>;
    totalSecondsDuration: MutableRefObject<number>;
    isFinishedCounting: MutableRefObject<boolean>;
}

export default function TimerUI({
    term,
    setTerm,
    isCounting,
    setIsCounting,
    totalSecondsDuration,
    isFinishedCounting,
}: CounterUIProp) {
    const [isInitializing, setIsInitializing] = useState(true);

    const intervalAddress = useRef<NodeJS.Timeout | null>(null);

    const audioContextRef = useRef<AudioContext | null>(null);
    const tickAudioBufferRef = useRef<AudioBuffer | null>(null);
    const finalTickAudioBufferRef = useRef<AudioBuffer | null>(null);

    useEffect(() => {
        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;

        (async function () {
            setIsInitializing(true);

            // so that the two promises run concurrently
            const promise1 = createAudioBuffer(audioContextRef, tickAudioBufferRef, '/tick.mp3');
            const promise2 = createAudioBuffer(audioContextRef, finalTickAudioBufferRef, '/final-tick.mp3');
            await Promise.all([promise1, promise2]);

            setIsInitializing(false);
        })();


    }, []);

    const handleTermChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTerm(parseInt(e.target.value) || 0);
        isFinishedCounting.current = true;
    }

    const tick = () => {
        setTerm((currTerm) => {
            if (currTerm <= 0) {
                handleStopClick();
                isFinishedCounting.current = true;
                return 0;
            }

            if (currTerm > 1)
                playAudio(tickAudioBufferRef, audioContextRef, 0);
            else if (currTerm === 1)
                playAudio(finalTickAudioBufferRef, audioContextRef, 0);

            return currTerm - 1;
        });
    }

    const handleStartClick = () => {
        setIsCounting(true);
        if (isFinishedCounting.current === true) totalSecondsDuration.current = term;
        isFinishedCounting.current = false;
        intervalAddress.current = setInterval(tick, 1000);

    };

    const handleStopClick = () => {
        clearInterval(intervalAddress.current as NodeJS.Timeout);
        intervalAddress.current = null;
        setIsCounting(false);
    };

    const handleResetClick = () => {
        setTerm(4);
        setIsCounting(false);
        isFinishedCounting.current = true;
        totalSecondsDuration.current = 4;
        intervalAddress.current = null;
    };

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleStartClick();
    }

    return <form onSubmit={handleFormSubmit} className="
        w-[31.25em] h-[31.25em] 
        flex justify-center items-center
        absolute top-[0] left-[0]
    ">
        <div className="
            relative top-[2.188em] 
            flex flex-col jsutify-center items-center gap-[1.25rem]
        ">
            <input
                disabled={isCounting}
                min="0"
                value={term}
                onChange={handleTermChange}
                type="number"
                className="
                    text-[1rem]
                    w-[13em]
                    text-brand-dark
                    font-semibold
                    pl-3  
                    border-brand-regular
                    border
                    bg-[#fff]
                    disabled:bg-brand-light
                    focus:outline-none
                    focus:outline-brand-lightMedium
                    focus:outline-offset-[-1px]
                    focus:rounded-none
                    screen-2xs:w-[11em]
                    screen-3xs:w-[10em]
                    screen-4xs:w-[7em]
                "
            />
            <fieldset className="flex gap-[1em]">
                <Button regular
                    disabled={isInitializing || isCounting}
                    onClick={handleStartClick}
                    className="text-[1em]"
                >
                    Start
                </Button>
                <Button danger
                    disabled={isInitializing}
                    onClick={handleStopClick}
                    className="text-[1em]"
                >
                    Stop
                </Button>
            </fieldset>
            <fieldset className="flex flex-col items-center gap-[0.15rem] font-medium">
                <SmallRoundButton
                    id="reset"
                    disabled={isInitializing || isCounting}
                    onClick={handleResetClick}
                />
                <label htmlFor="reset" className="text-[1em] text-brand-dark">Reset</label>
            </fieldset>
        </div>
    </form>;
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
    time: number,
) {
    if (!audioContextRef.current || !audioBufferRef.current) return;

    const bufferSource = audioContextRef.current.createBufferSource();
    bufferSource.buffer = audioBufferRef.current;
    bufferSource.connect(audioContextRef.current.destination);
    bufferSource.start(time);
}