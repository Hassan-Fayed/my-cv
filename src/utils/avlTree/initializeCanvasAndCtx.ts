import type { RefObject } from 'react';

export default function initializeCanvasAndCtx(
    canvasRef: RefObject<HTMLCanvasElement | null>,
    ctxRef: RefObject<CanvasRenderingContext2D | null>
) {
    if (!canvasRef.current) return;


    // get context only if you did not get one before:
    if (!ctxRef.current)
        ctxRef.current = canvasRef.current.getContext('2d');

    if (!ctxRef.current) return;

    ctxRef.current.fillStyle = '#001c1e';
    ctxRef.current.strokeStyle = '#f0184a';
    ctxRef.current.textAlign = 'center';
    ctxRef.current.textBaseline = 'middle';
}