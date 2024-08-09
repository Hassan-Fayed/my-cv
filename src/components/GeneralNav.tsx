import { IoMdArrowDropleft } from "react-icons/io";
import { Press_Start_2P } from 'next/font/google';

import IconLink from "@/components/IconLink";

const pressStart2p = Press_Start_2P({ weight: "400", subsets: ["latin"] });

interface GeneralNavProps {
    title: string;
}

export default function GeneralNav({ title }: GeneralNavProps) {
    return <nav className="h-[4.7rem] w-full relative">
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
        `}>{title}</h1>
        <div className="
            w-full 
            h-full
            absolute
            top-[0]
            left-[0]
            flex 
            justify-center
        ">
            <div className="w-projects-container-width flex items-center">
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
            </div>
        </div>
    </nav>;
}