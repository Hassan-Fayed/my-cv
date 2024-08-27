import Link from 'next/link';

import IconLink from '../../IconLink';
import { IoMdArrowDropup } from "react-icons/io";

export default function Footer() {
    return <footer className="h-[61.805svh] bg-brand-dark flex justify-center relative">
        <div className="
            max-w-container-width 
            flex flex-col justify-center items-center
            text-[1rem]
            screen-md:text-[0.9rem]
            screen-s:text-[0.8rem]
            screen-2xs:text-[0.7rem]
            screen-3xs:text-[0.6rem]
        ">
            <p className="text-brand-regular text-[max(1.875em,1rem)] mb-[0.5em]">
                {'I appreciate your visit (^_^)'}
            </p>
            <Link href="/contact-info" className="
                text-[#529989]
                text-[max(1.875em,1rem)]
                hover:text-brand-light
                transition-colors
            ">Contact me</Link>
            <div className="absolute top-7 right-7 animate-goUpwards hover:animate-none">
                <IconLink
                    isLinkingOutside={false}
                    color="text-brand-light"
                    hoverColor="group-hover:text-brand-light"
                    hoverBackgroundColor="hover:bg-brand-darkMedium"
                    hoverContainerDimensions="w-[2.9em] h-[2.9em]"
                    to="#top"
                    fontSize="text-[max(4em,1rem)]"
                >
                    <IoMdArrowDropup className="relative top-[-0.125rem]" />
                </IconLink>
            </div>
        </div>
    </footer>;
}