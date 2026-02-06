'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

import AVLTreeNav from '@/components/AVLTreePage/AVLTreeNav/AVLTreeNav';
import AVLTreeDisplay from '@/components/AVLTreePage/AVLTreeDisplay';
import Modal from '@/components/Modal';

import { useModalContext } from '@/context/modalContext';

import { BST } from '@/utils/binarySearchTree';
import pixelBall from '../../../../public/pixelBall.png';

export default function AvlTreePage() {
    const { setIsShowModal, setModalMsg } = useModalContext();
    const [isImgLoaded, setIsImgLoaded] = useState(false);

    const bSTRef = useRef<BST | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const ballImgElRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const imgEl = new Image();
        imgEl.src = pixelBall.src;
        ballImgElRef.current = imgEl;

        imgEl.addEventListener('load', () => setIsImgLoaded(true), { once: true });
    }, []);

    useEffect(() => {
        function checkScreenAspectRatio() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const ratio = width / height;
            if (ratio < 1) {
                setModalMsg('Please, make the window wider or rotate your screen.');
                setIsShowModal(true);
            } else {
                setIsShowModal(false);
                setModalMsg('');
            }
        }
        checkScreenAspectRatio();

        window.addEventListener('resize', checkScreenAspectRatio);

        return () => window.removeEventListener('resize', checkScreenAspectRatio);
    }, [setIsShowModal, setModalMsg]);


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
            ballImgElRef={ballImgElRef}
            isImgLoaded={isImgLoaded}
        />
        <AVLTreeDisplay
            getBST={getBST}
            canvasRef={canvasRef}
            ctxRef={ctxRef}
            navRef={navRef}
            ballImgElRef={ballImgElRef}
        />
        <Modal />
    </div>;
}