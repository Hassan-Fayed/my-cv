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

    return <div className="min-w-full pb-[8.899rem]">
        <div className="
            relative
            top-[5.5rem] 
            text-brand-dark 
            font-bold 
            text-3xl 
            w-max
            ml-auto
            mr-auto 
        ">
            {renderedTreeASCIIArr}
        </div>
    </div>;
}