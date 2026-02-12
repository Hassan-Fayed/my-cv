'use client';

import type { RefObject } from "react";
import type { BSTType } from "@/utils/binarySearchTree";

import { useEffect, useState } from "react";

import { useModalContext } from "@/context/modalContext";
import initializeCanvasAndCtx from "@/utils/avlTree/initializeCanvasAndCtx";
import drawBinaryTree from "@/utils/avlTree/drawBinaryTree";

interface AVLTreeDisplayProps {
    canvasRef: RefObject<HTMLCanvasElement | null>;
    ctxRef: RefObject<CanvasRenderingContext2D | null>;
    navRef: RefObject<HTMLDivElement | null>;
    getBST: () => BSTType;
    getBallImgEl: () => HTMLImageElement;
}

export default function AVLTreeDisplay({ getBST, navRef, canvasRef, ctxRef, getBallImgEl }: AVLTreeDisplayProps) {
    const [canvasDimensions, setCanvasDimensions] = useState({ width: 300, height: 150 });
    const { setIsShowModal, setModalMsg } = useModalContext();

    useEffect(() => {
        // eslint-disable-next-line
        setCanvasDimensions({
            width: window.innerWidth,
            height: navRef.current ? window.innerHeight - parseFloat(getComputedStyle(navRef.current).height) : window.innerHeight,
        });
    }, [navRef]);

    useEffect(() => {
        // whenever canvasDimensions change reinit ctx and attempt to draw the binary tree if any
        initializeCanvasAndCtx(canvasRef, ctxRef);

        const bST = getBST();
        if (canvasRef.current && ctxRef.current && bST.root) {
            drawBinaryTree(
                bST.root,    //pNode
                canvasRef.current,  // canvas
                ctxRef.current,    // context
                getBallImgEl(),
                canvasRef.current.width / 2,    // x
                bST.maxDepth() - 1,    // parent coordinates
            );
        }
    }, [canvasDimensions, canvasRef, ctxRef, getBallImgEl, getBST]);

    useEffect(() => {
        const resizeHandler = () => {
            setCanvasDimensions({
                width: window.innerWidth,
                height: navRef.current ? window.innerHeight - parseFloat(getComputedStyle(navRef.current).height) : window.innerHeight,
            });
        };
        window.addEventListener('resize', resizeHandler);

        // show the modal component when the aspect ration is not a landscape.
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

        // clean up
        return () => {
            window.removeEventListener('resize', resizeHandler);
            window.removeEventListener('resize', checkScreenAspectRatio);
        };
    }, [canvasRef, ctxRef, navRef, getBST, getBallImgEl, setIsShowModal, setModalMsg]);

    return <canvas
        ref={canvasRef}
        width={canvasDimensions.width}
        height={canvasDimensions.height}
    ></canvas>;
}