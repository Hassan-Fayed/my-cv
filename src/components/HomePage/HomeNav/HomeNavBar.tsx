'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Press_Start_2P } from 'next/font/google';
import { FaGithub } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaBehance } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";

import IconLink from '@/components/IconLink';
import NavLink from './NavLink';
import NavDropdown from './NavDropdown';
import HamburgerList from './HamburgerList';
import paths from '@/utils/paths';
import { useModalContext } from '@/context/modalContext';

const pressStart2p = Press_Start_2P({ weight: '400', subsets: ["latin"] });

export default function HomeNavBar() {
    const { setIsShowModal } = useModalContext();
    const [isShowHamburgerList, setIsShowHamburgerList] = useState(false);
    const hamburgerButtonRef = useRef<HTMLButtonElement>(null);

    const handleAboutClick = () => {
        setIsShowModal(true);
    };

    const handleHamburgerClick = () => {
        setIsShowHamburgerList((currVal) => {
            return !currVal;
        });
    };

    return <nav id="top" className="
        min-h-[3.7rem]
        flex 
        justify-center 
        bg-brand-light 
        sticky
        top-[0]
        left-[0]
        z-[10]
        px-11
        screen-2xs:px-6
    ">
        <div className="w-full max-w-container-width flex h-fill justify-between relative z-10">
            <ul className="flex gap-16 screen-md:gap-12">
                <li className={`
                    ${pressStart2p.className} 
                    flex self-stretch 
                    bg-brand-dark 
                    px-2
                `}>
                    <Link href={paths.home()} className="
                        text-[1.5rem] 
                        text-brand-light 
                        flex
                        justify-center
                        items-center
                        relative
                        left-[0.2rem]
                    ">
                        HF
                    </Link>
                </li>
                <li className="flex relative screen-s:hidden">
                    <NavDropdown
                        title="Projects"
                        dropdownList={[
                            { title: 'AVL Tree', link: paths.avlTree() },
                            { title: 'Timer', link: paths.timer() },
                            { title: 'PokéFight', link: paths.pokeFight() },
                            { title: 'To do', link: paths.toDo() },
                            { title: 'Particles', link: paths.particlesSystem() },
                            { title: 'Comments', link: paths.comments() },
                        ]}
                    />
                </li>
                <li onClick={handleAboutClick} className="flex relative screen-s:hidden">
                    <NavLink to="" >About</NavLink>
                </li>
                <li className="flex relative screen-s:hidden">
                    <NavLink to={paths.contactInfo()} >Contact Info</NavLink>
                </li>
            </ul>
            <ul className="flex items-center gap-4">
                <li className="screen-s:hidden">
                    <IconLink
                        isLinkingOutside
                        color="text-brand-lightMedium"
                        hoverColor="group-hover:text-brand-extraDark"
                        hoverBackgroundColor="hover:bg-brand-darkLight"
                        hoverContainerDimensions="w-[2.9rem] h-[2.9rem]"
                        to={process.env.NEXT_PUBLIC_MY_GITHUB || ''}
                        fontSize="text-[1.7rem]"
                    >
                        <FaGithub />
                    </IconLink>
                </li>
                <li className="screen-s:hidden">
                    <IconLink
                        isLinkingOutside
                        color="text-brand-lightMedium"
                        hoverColor="group-hover:text-brand-extraDark"
                        hoverBackgroundColor="hover:bg-brand-darkLight"
                        hoverContainerDimensions="w-[2.9rem] h-[2.9rem]"
                        to={process.env.NEXT_PUBLIC_MY_LINKEDIN || ''}
                        fontSize="text-[1.4rem]"
                    >
                        <FaLinkedinIn />
                    </IconLink>
                </li>
                <li className="screen-s:hidden">
                    <IconLink
                        isLinkingOutside
                        color="text-brand-lightMedium"
                        hoverColor="group-hover:text-brand-extraDark"
                        hoverBackgroundColor="hover:bg-brand-darkLight"
                        hoverContainerDimensions="w-[2.9rem] h-[2.9rem]"
                        to={process.env.NEXT_PUBLIC_MY_BEHANCE || ''}
                        fontSize="text-[1.7rem]"
                    >
                        <FaBehance className="relative top-[0.0375rem] left-[0.0375rem]" />
                    </IconLink>
                </li>
                <li className="hidden screen-s:list-item">
                    <button
                        ref={hamburgerButtonRef}
                        onClick={handleHamburgerClick}
                        className="
                            flex justify-center items-center
                            w-[2.9rem] h-[2.9rem] text-[1.7rem] text-brand-lightMedium rounded-full
                            hover:text-brand-extraDark hover:bg-brand-darkLight
                        "
                    >
                        <FaBars className="relative top-[0.0375rem] left-[0.0375rem]" />
                    </button>
                </li>
            </ul>
        </div>

        {isShowHamburgerList && <HamburgerList setIsShowHamburgerList={setIsShowHamburgerList} hamburgerButtonRef={hamburgerButtonRef} />}
    </nav>;
}