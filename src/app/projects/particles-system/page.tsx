'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';

import type Particle from '@/utils/particlesSystem/particles';
import ParticlesSystemNav from '@/components/ParticlesPage/ParticlesSystemNav';
const DynamicFullPageCanvas = dynamic(() => import('@/components/ParticlesPage/FullPageCanvas'), { ssr: false });

export default function ParticlesPage() {
    const navRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const particlesArrRef = useRef<Particle[]>([]);

    return <div className="bg-brand-dark h-svh overflow-clip">
        <ParticlesSystemNav
            navRef={navRef}
            canvasRef={canvasRef}
            ctxRef={ctxRef}
            particlesArrRef={particlesArrRef}
        />
        <DynamicFullPageCanvas
            canvasRef={canvasRef}
            ctxRef={ctxRef}
            navRef={navRef}
            particlesArrRef={particlesArrRef}
        />
    </div>;
}