'use client';

import type { ChangeEvent, Dispatch, SetStateAction, FormEvent } from 'react';

import { IoMdArrowDropleft } from "react-icons/io";
import { Press_Start_2P } from 'next/font/google';

import IconLink from "@/components/IconLink";
import Switch from "./Switch";

const pressStart2p = Press_Start_2P({ weight: "400", subsets: ["latin"] });

interface AVLTreeProps {
    term: string;
    setTerm: Dispatch<SetStateAction<string>>;
    isDelete: boolean;
    setIsDelete: Dispatch<SetStateAction<boolean>>;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function AVLTreeNav({ term, setTerm, isDelete, setIsDelete, onSubmit }: AVLTreeProps) {
    const handleTermChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTerm(e.target.value);
    }

    const inputPlaceHolder = isDelete ? 'Delete a number' : 'Add a number';

    return <nav className="sticky top-[0] left-[0] h-[4.7rem] w-full z-10">
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
                <form onSubmit={onSubmit} className="flex gap-5">
                    <input
                        max={99}
                        min={-9}
                        value={term}
                        onChange={handleTermChange}
                        type="number"
                        placeholder={inputPlaceHolder}
                        className="
                            w-[11.308rem]
                            pl-2 
                            focus:outline-none 
                            focus:outline-brand-lightMedium
                            focus:outline-offset-[-1px]
                            focus:rounded-none
                        "
                    />
                    <Switch value={isDelete} setValue={setIsDelete} />
                </form>
            </div>
        </div>
    </nav>;
}