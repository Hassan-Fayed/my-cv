'use client';

import { useRef, useCallback } from 'react';

import AVLTreeNav from '@/components/AVLTreePage/AVLTreeNav/AVLTreeNav';
import AVLTreeDisplay from '@/components/AVLTreePage/AVLTreeDisplay';
import Modal from '@/components/Modal';

import { BST } from '@/utils/binarySearchTree';
import pixelBall from '../../../../public/pixelBall.png';

export default function AvlTreePage() {
    const bSTRef = useRef<BST | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const ballImgElRef = useRef<HTMLImageElement | null>(null);

    const getBallImgEl = useCallback(() => {
        if (ballImgElRef.current === null) {
            const imgEl = new Image();
            imgEl.src = pixelBall.src;
            ballImgElRef.current = imgEl;
        }
        return ballImgElRef.current;
    }, []);

    const getBST = useCallback(() => {
        if (!bSTRef.current) {
            const newBST = new BST();
            bSTRef.current = newBST;
        }
        return bSTRef.current;
    }, []);

    return <div className="min-h-svh bg-brand-light overflow-clip">
        <AVLTreeNav
            canvasRef={canvasRef}
            ctxRef={ctxRef}
            navRef={navRef}
            getBST={getBST}
            getBallImgEl={getBallImgEl}
        />
        <AVLTreeDisplay
            getBST={getBST}
            canvasRef={canvasRef}
            ctxRef={ctxRef}
            navRef={navRef}
            getBallImgEl={getBallImgEl}
        />
        <Modal />
    </div>;
}