'use client';

import type { RefObject, MutableRefObject } from "react";
import type { BSTType } from "@/utils/binarySearchTree";

import { useEffect } from "react";

import initializeCanvasAndCtx from "@/utils/avlTree/initializeCanvasAndCtx";
import drawBinaryTree from "@/utils/avlTree/drawBinaryTree";

interface AVLTreeDisplayProps {
    getBST: () => BSTType;
    navRef: RefObject<HTMLDivElement>;
    canvasRef: RefObject<HTMLCanvasElement>;
    ctxRef: MutableRefObject<CanvasRenderingContext2D | null>;
    ballImgElRef: MutableRefObject<HTMLImageElement | null>;
}

export default function AVLTreeDisplay({ getBST, navRef, canvasRef, ctxRef, ballImgElRef }: AVLTreeDisplayProps) {
    useEffect(() => {
        initializeCanvasAndCtx(canvasRef, ctxRef, navRef);

        const resizeHandler = () => {
            if (!canvasRef.current || !ctxRef.current || !ballImgElRef.current) return;

            initializeCanvasAndCtx(canvasRef, ctxRef, navRef);

            const bST = getBST();
            drawBinaryTree(
                bST.root,    //pNode
                canvasRef.current,  // canvas
                ctxRef.current,    // context
                ballImgElRef.current,
                canvasRef.current.width / 2,    // x
                bST.maxDepth() - 1,    // parent coordinates
            );
        };
        window.addEventListener('resize', resizeHandler);

        return () => window.removeEventListener('resize', resizeHandler);
    }, [canvasRef, ctxRef, navRef, getBST, ballImgElRef]);

    return <canvas ref={canvasRef}></canvas>;
}