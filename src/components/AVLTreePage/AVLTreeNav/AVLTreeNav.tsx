'use client';

import { useState } from 'react';

import type { ChangeEvent, RefObject, MutableRefObject, FormEvent } from 'react';
import type { BSTType } from '@/utils/binarySearchTree';

import { IoMdArrowDropleft } from "react-icons/io";
import { Press_Start_2P } from 'next/font/google';

import { useModalContext } from '@/context/modalContext';

import IconLink from "@/components/IconLink";
import Switch from "./Switch";
import drawBinaryTree from '@/utils/avlTree/drawBinaryTree';

const pressStart2p = Press_Start_2P({ weight: "400", subsets: ["latin"] });

interface AVLTreeNavProps {
    canvasRef: RefObject<HTMLCanvasElement>;
    ctxRef: MutableRefObject<CanvasRenderingContext2D | null>;
    navRef: RefObject<HTMLDivElement>;
    getBST: () => BSTType;
    ballImgElRef: MutableRefObject<HTMLImageElement | null>;
    isImgLoaded: boolean;
}

export default function AVLTreeNav({ canvasRef, ctxRef, navRef, getBST, ballImgElRef, isImgLoaded }: AVLTreeNavProps) {
    const [isDelete, setIsDelete] = useState(false);
    const [term, setTerm] = useState('');

    const { isShowModal, setIsShowModal, setModalMsg } = useModalContext();

    const handleTermChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTerm(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!term || !canvasRef.current || !ctxRef.current || !ballImgElRef.current) {
            setTerm('');
            return;
        }

        const bST = getBST();
        if (!isDelete) {    // add an element to the bST
            bST.add(parseInt(term));
            const maxDepth = bST.maxDepth();
            if (maxDepth > 5) {
                bST.delete(parseInt(term));
                setModalMsg('This binary search tree can not have more than 5 levels.');
                setIsShowModal(true);
            } else {
                setIsShowModal(false);
                setModalMsg('');
            }
        } else {    // remove an element from the bST
            bST.delete(parseInt(term));
        }

        setTerm('');

        drawBinaryTree(
            bST.root,
            canvasRef.current,
            ctxRef.current,
            ballImgElRef.current,
            canvasRef.current.width / 2,
            bST.maxDepth() - 1
        );
    };


    return <nav ref={navRef} className="
        bg-brand-regular
        h-[4.7rem] w-full
        sticky top-[0] left-[0] z-10
    ">
        <h1 className={`
            ${pressStart2p.className} text-[2rem] text-brand-extraLight
            w-full h-full
            flex justify-center items-center
            screen-slg:hidden
        `}>
            AVL Tree
        </h1>
        <div className="
            w-full h-full
            absolute top-[0] left-[0]
            px-[2.168rem]
            screen-2xs:px-[1rem]
            screen-4xs:px-[0.5rem]
        ">
            <div className="
                max-w-projects-container-width h-full mx-auto
                flex justify-between items-center
                text-[1rem]
                screen-4xs:text-[0.9rem] 
            ">
                <IconLink
                    isLinkingOutside={false}
                    color="text-brand-extraLight"
                    hoverColor="group-hover:text-brand-dark"
                    hoverBackgroundColor="hover:bg-brand-darkRegular"
                    hoverContainerDimensions="w-[2.9em] h-[2.9em]"
                    to="/"
                    fontSize="text-[3em]"
                >
                    <IoMdArrowDropleft className="relative right-[0.05em]" />
                </IconLink>
                <h1 className={`
                    ${pressStart2p.className} text-[2rem] text-brand-extraLight hidden
                    screen-slg:block
                    screen-s:text-[1.618rem]
                    screen-ss:hidden
                `}>
                    AVL Tree
                </h1>
                <form onSubmit={handleSubmit}>
                    <fieldset disabled={!isImgLoaded || isShowModal} className="flex gap-[1.25em]" >
                        <input
                            max={99}
                            min={-9}
                            value={term}
                            onChange={handleTermChange}
                            type="number"
                            placeholder={isDelete ? 'Delete a number' : 'Add a number'}
                            className="
                                text-[1em]
                                w-[11.308em]
                                pl-[0.5rem]
                                focus:outline-none 
                                focus:outline-brand-lightMedium
                                focus:outline-offset-[-1px]
                                focus:rounded-none
                                screen-3xs:w-[9.5em]
                                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                            "
                        />
                        <Switch value={isDelete} setValue={setIsDelete} className="text-[1em]" />
                    </fieldset>
                </form>
            </div>
        </div>
    </nav>;
}