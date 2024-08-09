'use client';

import { useState } from 'react';
import type { ChangeEvent } from 'react';

import { IoMdArrowDropleft } from "react-icons/io";
import { Press_Start_2P } from 'next/font/google';

import IconLink from "@/components/IconLink";
import Switch from "./Switch";

const pressStart2p = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export default function AVLTreeNav() {
    const [term, setTerm] = useState('');
    const [isDelete, setIsDelete] = useState(false);

    const handleTermChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTerm(e.target.value);
    }

    const inputPlaceHolder = isDelete ? 'Delete a number' : 'Add a number';

    return <nav className="fixed top-[0] left-[0] h-[4.7rem] w-full">
        <h1 className={`
            w-full 
            h-full
            bg-brand-regular
            ${pressStart2p.className}
            text-brand-extraLight
            text-[2rem]
            flex
            justify-center
            items-center
        `}>AVL Tree</h1>
        <div className="
            w-full 
            h-full
            absolute
            top-[0]
            left-[0]
            flex 
            justify-center
        ">
            <div className="w-projects-container-width flex justify-between items-center">
                <IconLink
                    isLinkingOutside={false}
                    color="text-brand-extraLight"
                    hoverColor="group-hover:text-brand-dark"
                    hoverBackgroundColor="hover:bg-brand-darkRegular"
                    hoverContainerDimensions="w-[2.9rem] h-[2.9rem]"
                    to="/"
                    fontSize="text-[3rem]"
                >
                    <IoMdArrowDropleft className="relative right-0.5" />
                </IconLink>
                <div className="flex gap-5">
                    <input
                        value={term}
                        onChange={handleTermChange}
                        type="number"
                        placeholder={inputPlaceHolder}
                        className="pl-2"
                    />
                    <Switch value={isDelete} setValue={setIsDelete} />
                </div>
            </div>
        </div>
    </nav>;
}