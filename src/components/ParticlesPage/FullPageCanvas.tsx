import type { RefObject, MutableRefObject } from 'react';
import { useState, useEffect } from 'react';

import type Particle from '@/utils/particlesSystem/particles';
import { initializeCanvas, redistributeParticles } from '@/utils/particlesSystem/helperFunctions';

interface FullPageCanvasPropsType {
    canvasRef: RefObject<HTMLCanvasElement>;
    ctxRef: MutableRefObject<CanvasRenderingContext2D | null>;
    navRef: RefObject<HTMLDivElement>;
    particlesArrRef: MutableRefObject<Particle[]>;
    [key: string]: unknown;
}

export default function FullPageCanvas({ canvasRef, ctxRef, navRef, particlesArrRef, ...rest }: FullPageCanvasPropsType) {
    const [canvasDimensions, setCanvasDimensions] = useState({ width: 300, height: 150 });

    useEffect(() => {
        setCanvasDimensions({
            width: window.innerWidth,
            height: navRef.current ? window.innerHeight - parseFloat(getComputedStyle(navRef.current).height) : window.innerHeight,
        });
    }, [navRef]);

    useEffect(() => {
        initializeCanvas(canvasRef, ctxRef, navRef);

        function resizeHandler() {
            if (!navRef.current) return;

            const newDimensions = {
                width: window.innerWidth,
                height: window.innerHeight - parseFloat(getComputedStyle(navRef.current).height)
            }
            setCanvasDimensions(newDimensions);

            redistributeParticles(newDimensions, particlesArrRef);
        }
        window.addEventListener('resize', resizeHandler);

        return () => window.removeEventListener('resize', resizeHandler);
    }, [canvasRef, ctxRef, navRef, particlesArrRef, canvasDimensions]);

    return <canvas ref={canvasRef} width={canvasDimensions.width} height={canvasDimensions.height} {...rest}></canvas>;
}