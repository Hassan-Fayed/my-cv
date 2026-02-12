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
    const totalSecondsDurationRef = useRef(4);
    const isFinishedCountingRef = useRef(true);

    return <div className={`relative ${className}`}>
        <TimerUI
            term={term}
            setTerm={setTerm}
            isCounting={isCounting}
            setIsCounting={setIsCounting}
            totalSecondsDurationRef={totalSecondsDurationRef}
            isFinishedCountingRef={isFinishedCountingRef}
        />
        <TimerCanvasShow
            totalSecondsDurationRef={totalSecondsDurationRef}
            term={term}
        />
    </div>;
}