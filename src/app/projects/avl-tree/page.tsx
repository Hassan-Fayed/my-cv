'use client';

import { useEffect, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import AVLTreeNav from '@/components/AVLTreePage/AVLTreeNav/AVLTreeNav';
import AVLTreeDisplay from '@/components/AVLTreePage/AVLTreeDisplay';
import Modal from '@/components/Modal';

import { useModalContext } from '@/context/modalContext';

import { BST } from '@/utils/binarySearchTree';

export default function AvlTreePage() {
    const [, setRerender] = useState(false);
    const { isShowModal, setIsShowModal, modalMsg, setModalMsg } = useModalContext();

    const bSTRef = useRef<BST | null>(null);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const newBST = new BST();
        bSTRef.current = newBST;

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

    const handleChange = (term: string, setTerm: Dispatch<SetStateAction<string>>, isDelete: Boolean) => {
        if (!term || !bSTRef.current) {
            setTerm('');
            return;
        }

        if (!isDelete) {    // add an element to the bST
            bSTRef.current.add(parseInt(term));
            const maxDepth = bSTRef.current.maxDepth();
            if (maxDepth > 5) {
                bSTRef.current.delete(parseInt(term));
                setModalMsg('This binary search tree can not have more than 5 levels.');
                setIsShowModal(true);
            } else {
                setIsShowModal(false);
                setModalMsg('');
            }
        } else {    // remove an element from the bST
            bSTRef.current.delete(parseInt(term));
        }

        setTerm('');

        setRerender(curr => !curr);
    };

    return <div className="min-h-svh bg-brand-light overflow-clip">
        <AVLTreeNav
            onChange={handleChange}
            navRef={navRef}
            isShowModal={isShowModal}
        />
        <AVLTreeDisplay bSTRef={bSTRef} navRef={navRef} />
        <Modal />
    </div>;
}