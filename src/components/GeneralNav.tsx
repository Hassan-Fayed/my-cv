import { IoMdArrowDropleft } from "react-icons/io";

import IconLink from "@/components/IconLink";
import { pressStart2pFont } from '@/utils/fonts';

interface GeneralNavProps {
    title: string;
}

export default function GeneralNav({ title }: GeneralNavProps) {
    return <nav className="
        text-[1rem]
        h-[4.7rem] w-full 
        relative z-30
        max-screen-xs:text-[0.9rem]
        max-screen-2xs:text-[0.8rem]
        max-screen-3xs:text-[0.7rem]
        max-screen-4xs:text-[0.6rem]
    ">
        <h1 className={`
            ${pressStart2pFont.className}
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
            max-screen-4xs:px-4
        ">
            <div className="
                text-[1rem]
                w-projects-container-width 
                flex items-center
                max-screen-2xs:text-[0.9rem]
                max-screen-3xs:text-[0.8rem]
                max-screen-4xs:text-[0.7rem]
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