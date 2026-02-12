'use client';

import { IoMdArrowDropup } from "react-icons/io";

export default function ToTop() {
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return <div onClick={handleClick} className="
        w-[4rem] h-[4rem] rounded-[50%]
        absolute top-8 right-7 
        animate-goUpwards tratransition-colors
        hover:animate-none hover:bg-brand-darkMedium
        flex justify-center items-center
    ">
        <IoMdArrowDropup className="
            text-brand-light text-[4rem]
            relative top-[-0.125rem]
        " />
    </div>
}