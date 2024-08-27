'use client';

import { useState, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';

import AVLTreeNav from '@/components/AVLTreePage/AVLTreeNav/AVLTreeNav';
import AVLTreeDisplay from '@/components/AVLTreePage/AVLTreeDisplay';

import { BST } from '@/utils/binarySearchTree';

export default function AvlTreePage() {
    const [term, setTerm] = useState('');
    const [isDelete, setIsDelete] = useState(false);
    const bSTRef = useRef<BST | null>(null);

    useEffect(() => {
        const newBST = new BST();
        bSTRef.current = newBST;
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isDelete) {
            bSTRef.current?.add(parseInt(term));
            setTerm('');
        } else {
            bSTRef.current?.delete(parseInt(term));
            setTerm('');
        }
    };

    return <div className="min-h-svh overflow-x-scroll bg-brand-light">
        <AVLTreeNav
            term={term}
            setTerm={setTerm}
            isDelete={isDelete}
            setIsDelete={setIsDelete}
            onSubmit={handleSubmit}
        />
        <AVLTreeDisplay bSTRef={bSTRef} />
    </div>;
}