import Link from 'next/link';
import type { Dispatch } from 'react';
import type { SetStateAction } from 'react';

interface DropdownContent {
    title: string;
    link: string;
}

interface NavDropdownListProps {
    dropdownList: DropdownContent[];
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    listWidth: string;
}

export default function NavDropdownList({ dropdownList, setIsOpen, listWidth }: NavDropdownListProps) {
    const dropdownListTitles = dropdownList.map((item) => {
        return <li
            className="hover:text-brand-extraDark hover:font-bold pb-1.5 transition-all"
            key={item.title}
        >
            <Link
                className="text-base"
                onClick={() => setIsOpen(false)}
                href={item.link}
            >
                {item.title}
            </Link>
        </li>;
    });

    return <ul className={`
        absolute 
        top-[3.7rem] 
        left-0 
        bg-brand-light
        p-3
        text-brand-lightMedium
        after:content-['']
        after:absolute
        after:top-[-0.25rem]
        after:left-0
        after:w-full
        after:bg-brand-extraDark
        after:w-full
        after:h-1
        animate-openDropdownList
        ${listWidth}
    `}>{dropdownListTitles}</ul>;
}