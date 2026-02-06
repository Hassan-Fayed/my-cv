import type { RefObject, MutableRefObject } from 'react';

export default function initializeCanvasAndCtx(
    canvasRef: RefObject<HTMLCanvasElement>,
    ctxRef: MutableRefObject<CanvasRenderingContext2D | null>,
    navRef: RefObject<HTMLDivElement>
) {
    if (!canvasRef.current || !navRef.current) return;

    const { height } = getComputedStyle(navRef.current);
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight - parseFloat(height);

    ctxRef.current = canvasRef.current.getContext('2d');
    if (!ctxRef.current) return;

    ctxRef.current.fillStyle = '#001c1e';
    ctxRef.current.strokeStyle = '#001c1e';
    ctxRef.current.textAlign = 'center';
    ctxRef.current.textBaseline = 'middle';
}