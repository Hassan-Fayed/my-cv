'use client';

import type { MutableRefObject } from "react";
import type { BSTType } from "@/utils/binarySearchTree";

import drawBinaryTree from '@/utils/drawBinaryTree';

interface AVLTreeDisplayProps {
    bSTRef: MutableRefObject<BSTType | null>;
}

export default function AVLTreeDisplay({ bSTRef }: AVLTreeDisplayProps) {
    let renderedTreeASCIIArr: JSX.Element[] | null = null;
    if (bSTRef.current) {
        const treeASCIIArr = drawBinaryTree(bSTRef.current);

        renderedTreeASCIIArr = treeASCIIArr.map((lvl, idx) => {
            return <pre key={idx}>{lvl}</pre>;
        });
    }

    return <div className="
        pb-[8.899rem] pt-[4rem]  
    ">
        <div className="
            px-[2.168rem] screen-2xs:px-[1rem] 
            w-max mx-auto
            text-[1.875rem] font-bold text-brand-dark 
            screen-s:text-[1.7rem]
            screen-xs:text-[1.6rem]
            screen-4xs:text-[1.5rem]
        ">
            {renderedTreeASCIIArr}
        </div>
    </div>;
}