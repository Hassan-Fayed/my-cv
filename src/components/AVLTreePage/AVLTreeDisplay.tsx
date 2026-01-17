'use client';

import { useRef, useEffect } from "react";

import drawBinaryTree from "@/utils/drawBinaryTree";

import type { MutableRefObject, RefObject } from "react";
import type { BSTType } from "@/utils/binarySearchTree";

interface AVLTreeDisplayProps {
    bSTRef: MutableRefObject<BSTType | null>;
    navRef: RefObject<HTMLDivElement>;
}

export default function AVLTreeDisplay({ bSTRef, navRef }: AVLTreeDisplayProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        initializeCanvasAndCtx(canvasRef, ctxRef, navRef);

        const resizeHandler = () => {
            if (!canvasRef.current || !ctxRef.current || !bSTRef.current) return;

            initializeCanvasAndCtx(canvasRef, ctxRef, navRef);

            const maxDepth = bSTRef.current.maxDepth();
            drawBinaryTree(
                bSTRef.current.root,    //pNode
                canvasRef.current,  // canvas
                ctxRef.current,    // context
                canvasRef.current.width / 2,    // x
                maxDepth - 1,    // parent coordinates
            );
        };
        window.addEventListener('resize', resizeHandler);

        return () => window.removeEventListener('resize', resizeHandler);
    }, [navRef, bSTRef]);

    (function draw(
        bsTRef: MutableRefObject<BSTType | null>,
        canvasRef: RefObject<HTMLCanvasElement>,
        ctxRef: MutableRefObject<CanvasRenderingContext2D | null>,

    ) {
        if (!bSTRef.current || !ctxRef.current || !canvasRef.current) return;

        const maxDepth = bSTRef.current.maxDepth();
        drawBinaryTree(
            bSTRef.current.root,    //pNode
            canvasRef.current,  // canvas
            ctxRef.current,    // context
            canvasRef.current.width / 2,    // x
            maxDepth - 1,    // geometric squence position
        );
    })(bSTRef, canvasRef, ctxRef);

    return <canvas className='block' ref={canvasRef}></canvas>;
}

function initializeCanvasAndCtx(
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