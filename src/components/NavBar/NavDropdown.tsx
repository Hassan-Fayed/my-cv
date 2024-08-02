'use client';

import { useState } from "react";
import classNames from "classnames";
import { IoMdArrowDropdown } from "react-icons/io";
import { IconContext } from "react-icons";

import NavDropdownList from "./NavDropdownList";

interface DropdownContent {
    title: string;
    link: string;
}

interface NavLinkProps {
    title: string;
    dropdownList: DropdownContent[];
}

export default function NavDropdown({ title, dropdownList }: NavLinkProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    }

    const pClassName = classNames(
        'font-bold',
        'flex',
        'justify-center',
        'items-center',
        'transition-colors',
        'cursor-pointer',
        'relative',
        'text-base',
        'transition-colors',
        {
            'text-brand-extraDark': isOpen,
            'text-brand-lightMedium': !isOpen,
        }
    );

    return <div
        className="group flex justify-center items-center relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
        <IconContext.Provider value={{
            size: "1.2rem",
            className: "relative group-hover:translate-y-0.5 transition-transform"
        }}>
            <p className={pClassName}>
                <span className="pr-1">{title}</span>
                <IoMdArrowDropdown />
            </p>
        </IconContext.Provider>
        {isOpen && <NavDropdownList listWidth="w-[7.3rem]" setIsOpen={setIsOpen} dropdownList={dropdownList} />}
    </div>;
}