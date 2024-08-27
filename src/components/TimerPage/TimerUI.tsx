'use client';

import { useRef } from "react";
import type { ChangeEvent, Dispatch, SetStateAction, MutableRefObject, FormEvent } from "react";

import Button from '@/components/Button';

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
    const intervalAddress = useRef<NodeJS.Timeout | null>(null);

    const tickSoundRef = useRef<HTMLAudioElement | null>(null);
    if (tickSoundRef.current === null && typeof Audio !== "undefined")
        tickSoundRef.current = new Audio('/tick.mp3')

    const finalTickSoundRef = useRef<HTMLAudioElement | null>(null);
    if (finalTickSoundRef.current === null && typeof Audio !== "undefined")
        finalTickSoundRef.current = new Audio('/final-tick.mp3');

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

            if (currTerm > 1 && tickSoundRef.current)
                tickSoundRef.current.play();
            else if (currTerm === 1 && finalTickSoundRef.current)
                finalTickSoundRef.current.play();

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
                    disabled={isCounting}
                    onClick={handleStartClick}
                    className="text-[1em]"
                >
                    Start
                </Button>
                <Button danger
                    onClick={handleStopClick}
                    className="text-[1em]"
                >
                    Stop
                </Button>
            </fieldset>
            <fieldset className="flex flex-col items-center">
                <button
                    onClick={handleResetClick}
                    disabled={isCounting}
                    type="button"
                    id="reset"
                    className={`
                        w-[0.7em] 
                        h-[0.7em] 
                        bg-brand-dark
                        hover:bg-brand-medium
                        transition-colors
                        rounded-[50%] 
                        ${isCounting && 'bg-brand-neutral hover:bg-brand-neutral'}
                    `}
                ></button>
                <label htmlFor="reset" className="text-[1em]">Reset</label>
            </fieldset>
        </div>
    </form>;
}