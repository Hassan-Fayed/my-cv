'use client';

import { useState, useRef } from "react";

import TimerUI from "./TimerUI";
import TimerCanvasShow from "./TimerCanvasShow";

interface TimerPropsType {
    className: string;
}

export default function Timer({ className }: TimerPropsType) {
    const [term, setTerm] = useState(4);
    const [isCounting, setIsCounting] = useState(false);
    const totalSecondsDuration = useRef(4);
    const isFinishedCounting = useRef(true);

    return <div className={`relative ${className}`}>
        <TimerUI
            term={term}
            setTerm={setTerm}
            isCounting={isCounting}
            setIsCounting={setIsCounting}
            totalSecondsDuration={totalSecondsDuration}
            isFinishedCounting={isFinishedCounting}
        />
        <TimerCanvasShow
            totalSecondsDuration={totalSecondsDuration}
            term={term}
        />
    </div>;
}