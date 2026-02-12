'use client';

import { useRef, useEffect } from "react";
import type { RefObject } from "react";

interface CounterCanvasShowPropsType {
    totalSecondsDurationRef: RefObject<number>;
    term: number;
}

export default function TimerCanvasShow({
    totalSecondsDurationRef,
    term: currentSecond,
}: CounterCanvasShowPropsType) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const currentAngleFactor = 2 * currentSecond / totalSecondsDurationRef.current;
        drawCounter(canvasRef, currentAngleFactor);
    }, [currentSecond, totalSecondsDurationRef]);

    return <canvas className="w-[31.25em] h-[31.25em]" ref={canvasRef} width="500" height="500">
        Timer
    </canvas>;
}

function drawCounter(canvasRef: RefObject<HTMLCanvasElement | null>, arcAngleFactor: number) {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();
    ctx.arc(250, 250, 200,
        ((2 * Math.PI) - (arcAngleFactor * Math.PI)) + (3 / 2 * Math.PI),
        (2 * Math.PI) + (3 / 2 * Math.PI)
    );

    const gradient = ctx.createConicGradient(1.5 * Math.PI, 250, 250);
    gradient.addColorStop(0.2, "#8ec571");
    gradient.addColorStop(0.9, "#488577");
    gradient.addColorStop(1, "#8ec571");

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 20;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(250, 250, 150, 0, 2 * Math.PI);
    ctx.fillStyle = '#d0e5c3';  // darkLight
    ctx.fill();
}