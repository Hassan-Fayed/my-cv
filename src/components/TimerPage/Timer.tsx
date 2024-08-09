'use client';

import { useState, useRef } from "react";

import TimerUI from "./TimerUI";
import TimerCanvasShow from "./TimerCanvasShow";

export default function Timer() {
    const [term, setTerm] = useState(60);
    const [isCounting, setIsCounting] = useState(false);
    const totalSecondsDuration = useRef(60);
    const isFinishedCounting = useRef(true);

    return <div className="w-[500px] h-[500px] relative">
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