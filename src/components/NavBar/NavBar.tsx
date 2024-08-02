import Link from 'next/link';
import { Press_Start_2P } from 'next/font/google';
import { FaGithub } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaBehance } from "react-icons/fa6";

import IconLink from './IconLink';
import NavLink from './NavLink';
import NavDropdown from './NavDropdown';

import paths from '@/utils/paths';

const pressStart2p = Press_Start_2P({ weight: '400', subsets: ["latin"] });

export default function NavBar() {
    return <nav className="
        w-full 
        h-[3.7rem]
        flex 
        justify-center 
        bg-brand-light 
        fixed
        top-[0]
        left-[0]
        z-[10]
    ">
        <div className="w-full max-w-container-width flex h-fill  justify-between">
            <ul className="flex gap-16">
                <li className={`
                    ${pressStart2p.className} 
                    flex self-stretch 
                    bg-brand-dark 
                    px-2`
                } >
                    <Link className="
                            text-[1.5rem] 
                            text-brand-light 
                            flex
                            justify-center
                            items-center
                            relative
                            left-[0.2rem]
                        " href={paths.home()}>HF</Link>
                </li>
                <li className="flex relative">
                    <NavDropdown
                        title="Projects"
                        dropdownList={[
                            { title: 'AVL Tree', link: paths.avlTree() },
                            { title: 'Counter', link: paths.counter() },
                            { title: 'PokeFight', link: paths.pokeFight() },
                            { title: 'To do', link: paths.toDo() },
                        ]}
                    />
                </li>
                <li className="flex relative">
                    <NavLink to={paths.about()} >About</NavLink>
                </li>
                <li className="flex relative">
                    <NavLink to={paths.contactInfo()} >Contact Info</NavLink>
                </li>
            </ul>
            <ul className="flex items-center gap-4">
                <li>
                    <IconLink
                        color="text-brand-lightMedium"
                        hoverColor="group-hover:text-brand-extraDark"
                        hoverBackgroundColor="hover:bg-brand-darkLight"
                        hoverContainerDimensions="w-[2.9rem] h-[2.9rem]"
                        to="https://www.github.com/HassanFayed8"
                        fontSize="text-[1.7rem]"
                    >
                        <FaGithub />
                    </IconLink>
                </li>
                <li>
                    <IconLink
                        color="text-brand-lightMedium"
                        hoverColor="group-hover:text-brand-extraDark"
                        hoverBackgroundColor="hover:bg-brand-darkLight"
                        hoverContainerDimensions="w-[2.9rem] h-[2.9rem]"
                        to="/"
                        fontSize="text-[1.4rem]"
                    >
                        <FaLinkedinIn />
                    </IconLink>
                </li>
                <li>
                    <IconLink
                        color="text-brand-lightMedium"
                        hoverColor="group-hover:text-brand-extraDark"
                        hoverBackgroundColor="hover:bg-brand-darkLight"
                        hoverContainerDimensions="w-[2.9rem] h-[2.9rem]"
                        to="https://www.behance.net/FayArts"
                        fontSize="text-[1.7rem]"
                    >
                        <FaBehance className="relative top-[0.0375rem] left-[0.0375rem]" />
                    </IconLink>
                </li>
            </ul>
        </div>
    </nav>;
}