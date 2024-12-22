'use client';

import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { IoCloseSharp } from "react-icons/io5";
import { useModalContext } from "@/context/modalContext";

export default function Modal() {
    const { isShowModal, setIsShowModal } = useModalContext();
    const modalContentRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (isShowModal) document.body.classList.add('overflow-hidden');
        else document.body.classList.remove('overflow-hidden');

        const handler = (e: MouseEvent) => {
            if (modalContentRef.current && !modalContentRef.current.contains(e.target as HTMLElement))
                setIsShowModal(false);
        }
        document.addEventListener('click', handler, true);

        return () => {
            document.body.classList.remove('overflow-hidden');
            document.removeEventListener('click', handler);
        };
    }, [setIsShowModal, isShowModal]);

    const handleCloseModalClick = () => {
        setIsShowModal(false);
    }

    return <>
        {isShowModal && createPortal(<div style={{ backgroundColor: 'rgba(55, 101, 91, 0.618)' }} className="
            fixed z-20 top-[0] left-[0]
            w-full h-svh 
            flex justify-center items-center
            text-[1rem]
            screen-slg:text-[0.95rem]
            screen-md:text-[0.8rem]
            screen-smd:text-[0.7rem]
            screen-2xs:text-[0.5rem]
        ">
            <button
                onClick={handleCloseModalClick}
                className="
                    absolute top-[1rem] right-[1.618rem] 
                    text-3xl text-brand-light rounded-full p-1
                    hover:bg-brand-dark
                "
            >
                <IoCloseSharp />
            </button>
            <p ref={modalContentRef} className="
                bg-brand-light 
                text-[max(1.875em,1rem)] 
                w-[57%] 
                px-[1.5em] 
                pt-[1.5em] 
                pb-[2em]
            ">
                This project was created to showcase my React skills. I used Nextjs, Tailwindcss, and Classnames.
            </p>
        </div>,
            document.getElementsByClassName('modal-container')[0]
        )}
    </>;
}