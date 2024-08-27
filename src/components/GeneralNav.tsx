import { IoMdArrowDropleft } from "react-icons/io";
import { Press_Start_2P } from 'next/font/google';

import IconLink from "@/components/IconLink";

const pressStart2p = Press_Start_2P({ weight: "400", subsets: ["latin"] });

interface GeneralNavProps {
    title: string;
}

export default function GeneralNav({ title }: GeneralNavProps) {
    return <nav className="
        text-[1rem]
        h-[4.7rem] w-full 
        sticky top-[0] left-[0] z-10
        screen-xs:text-[0.9rem]
        screen-2xs:text-[0.8rem]
        screen-3xs:text-[0.7rem]
        screen-4xs:text-[0.6rem]
    ">
        <h1 className={`
            ${pressStart2p.className}
            h-full
            bg-brand-regular
            text-brand-extraLight
            text-[2em]
            flex justify-center items-center
        `}>
            {title}
        </h1>
        <div className="
            w-full h-full
            absolute top-[0] left-[0]
            flex justify-center
            px-[2.168rem]
            screen-4xs:px-4
        ">
            <div className="
                text-[1rem]
                w-projects-container-width 
                flex items-center
                screen-2xs:text-[0.9rem]
                screen-3xs:text-[0.8rem]
                screen-4xs:text-[0.7rem]
            ">
                <IconLink
                    isLinkingOutside={false}
                    color="text-brand-extraLight"
                    hoverColor="group-hover:text-brand-dark"
                    hoverBackgroundColor="hover:bg-brand-darkRegular"
                    hoverContainerDimensions="w-[2.9em] h-[2.9em]"
                    to="/"
                    fontSize="text-[3em]"
                >
                    <IoMdArrowDropleft className="relative right-[0.05em]" />
                </IconLink>
            </div>
        </div>
    </nav>;
}