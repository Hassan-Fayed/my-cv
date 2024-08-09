'use client';

import { useRef } from "react";
import type { ChangeEvent, Dispatch, SetStateAction, MutableRefObject } from "react";

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
        setTerm(60);
        setIsCounting(false);
        isFinishedCounting.current = true;
        totalSecondsDuration.current = 60;
        intervalAddress.current = null;
    };

    return <form className="
        w-[500px] 
        h-[500px] 
        flex 
        justify-center
        items-center
        absolute 
        top-[0] 
        left-[0]
    ">
        <div className="relative top-[35px] flex flex-col jsutify-center items-center gap-5">
            <input
                disabled={isCounting}
                min="0"
                value={term}
                onChange={handleTermChange}
                type="number"
                className="
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
                "
            />
            <fieldset className="flex gap-[10px]">
                <Button regular
                    disabled={isCounting}
                    parentBackgroundColor="bg-brand-darkLight"
                    onClick={handleStartClick}
                >Start</Button>
                <Button danger
                    parentBackgroundColor="bg-brand-darkLight"
                    onClick={handleStopClick}
                >Stop</Button>
            </fieldset>
            <fieldset className="flex flex-col items-center">
                <button
                    onClick={handleResetClick}
                    disabled={isCounting}
                    type="button"
                    id="reset"
                    className={`
                        w-[0.7rem] 
                        h-[0.7rem] 
                        bg-brand-dark 
                        rounded-[50%] 
                        ${isCounting && 'bg-brand-neutral'}
                    `}
                ></button>
                <label htmlFor="reset">Reset</label>
            </fieldset>
        </div>
    </form>;
}