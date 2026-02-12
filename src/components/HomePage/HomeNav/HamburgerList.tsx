'use client';

import { useState, useEffect, useRef } from "react";
import type { Dispatch, SetStateAction, RefObject } from "react";
import Link from "next/link";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaBehance } from "react-icons/fa6";

import IconLink from "@/components/IconLink";
import paths from "@/utils/paths";
import { useModalContext } from "@/context/modalContext";

interface HamburgerListPropsType {
    setIsShowHamburgerList: Dispatch<SetStateAction<boolean>>;
    hamburgerButtonRef: RefObject<HTMLButtonElement | null>;
}

export default function HamburgerList({ setIsShowHamburgerList, hamburgerButtonRef }: HamburgerListPropsType) {
    const [isShowProjectsList, setIsShowProjectsList] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);
    const { setIsShowModal, setModalMsg } = useModalContext();

    useEffect(() => {
        const clickHandler = (e: MouseEvent) => {
            if (
                listRef.current && hamburgerButtonRef.current &&
                e.target instanceof HTMLElement &&
                !listRef.current.contains(e.target) &&
                !hamburgerButtonRef.current.contains(e.target)
            )
                setIsShowHamburgerList(false);
        };
        document.addEventListener('click', clickHandler);

        const scrollHandler = () => {
            setIsShowHamburgerList(false);
        }
        document.addEventListener('scroll', scrollHandler);

        return () => {
            document.removeEventListener('click', clickHandler);
            document.removeEventListener('scroll', scrollHandler);
        };
    }, [setIsShowHamburgerList, hamburgerButtonRef]);

    const handleProjectsBtnClick = () => {
        setIsShowProjectsList((currVal) => {
            return !currVal;
        });
    };

    const handleAboutClick = () => {
        setIsShowHamburgerList(false);
        setModalMsg('I created this project to showcase my React and Nextjs skills. I used Nextjs, Tailwindcss, Classnames, React Icons, and Firebase.');
        setIsShowModal(true);
    };

    return <div ref={listRef} className="
        bg-brand-darkLight absolute left-[0] top-[3.7rem] z-[0] 
        w-full box-border py-5
        animate-openDropdownList
        hidden
        max-screen-s:block
    ">
        <ul className="mx-5 flex flex-col gap-[0.25rem] font-bold text-brand-lightMedium max-w-container-width">
            <li className="flex flex-col items-start gap-[0.12rem]">
                <button onClick={handleProjectsBtnClick} className="flex items-center gap-1 group hover:text-brand-dark text-[1rem]">
                    Projects
                    <IoMdArrowDropdown className="text-[1.2em] group-hover:translate-y-0.5 transition-transform" />
                </button>
                {isShowProjectsList && <ul className="relative left-[1rem] font-medium">
                    <li className="hover:font-bold hover:text-brand-dark transition-all"><Link href={paths.avlTree()}>AVL Tree</Link></li>
                    <li className="hover:font-bold hover:text-brand-dark transition-all"><Link href={paths.timer()}>Timer</Link></li>
                    <li className="hover:font-bold hover:text-brand-dark transition-all"><Link href={paths.pokeFight()}>PokéFight</Link></li>
                    <li className="hover:font-bold hover:text-brand-dark transition-all"><Link href={paths.toDo()}>To do</Link></li>
                    <li className="hover:font-bold hover:text-brand-dark transition-all"><Link href={paths.particlesSystem()}>Particles</Link></li>
                    <li className="hover:font-bold hover:text-brand-dark transition-all"><Link href={paths.comments()}>Comments</Link></li>
                </ul>}
            </li>
            <li><button onClick={handleAboutClick} className="hover:text-brand-dark transition-all">About</button></li>
            <li><Link className="hover:text-brand-dark transition-all" href={paths.contactInfo()}>Contact Info</Link></li>

            <ul className="flex items-center gap-4 pt-3">
                <li>
                    <IconLink
                        isLinkingOutside
                        color="text-brand-lightMedium"
                        hoverColor="group-hover:text-brand-extraDark"
                        hoverBackgroundColor=""
                        hoverContainerDimensions=""
                        to={process.env.NEXT_PUBLIC_MY_GITHUB || ''}
                        fontSize="text-[1.6rem]"
                    >
                        <FaGithub />
                    </IconLink>
                </li>
                <li className="relative top-[0.0625rem]">
                    <IconLink
                        isLinkingOutside
                        color="text-brand-lightMedium"
                        hoverColor="group-hover:text-brand-extraDark"
                        hoverBackgroundColor=""
                        hoverContainerDimensions=""
                        to={process.env.NEXT_PUBLIC_MY_LINKEDIN || ''}
                        fontSize="text-[1.32rem]"
                    >
                        <FaLinkedinIn />
                    </IconLink>
                </li>
                <li>
                    <IconLink
                        isLinkingOutside
                        color="text-brand-lightMedium"
                        hoverColor="group-hover:text-brand-extraDark"
                        hoverBackgroundColor=""
                        hoverContainerDimensions=""
                        to={process.env.NEXT_PUBLIC_MY_BEHANCE || ''}
                        fontSize="text-[1.6rem]"
                    >
                        <FaBehance className="relative top-[0.0375rem] left-[0.0375rem]" />
                    </IconLink>
                </li>
            </ul>
        </ul>
    </div>;
}