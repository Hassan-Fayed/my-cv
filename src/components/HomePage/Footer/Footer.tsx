import Link from 'next/link';

import IconLink from '../../IconLink';
import { IoMdArrowDropup } from "react-icons/io";

export default function Footer() {
    return <footer className="h-[25.4rem] bg-brand-dark flex justify-center relative">
        <div className="
            max-w-container-width 
            w-full 
            flex 
            flex-col 
            justify-center 
            items-center
            gap-5
        ">
            <div className={`
                text-brand-regular
                text-3xl
            `}>{'I appreciate your visit (^_^)'}</div>
            <Link href="/contact-info" className="
                text-[#529989]
                text-3xl
                hover:text-brand-light
                transition-colors
            ">Contact me</Link>
            <div className="absolute top-7 right-7 animate-goUpwards hover:animate-none">
                <IconLink
                    isLinkingOutside={false}
                    color="text-brand-light"
                    hoverColor="group-hover:text-brand-light"
                    hoverBackgroundColor="hover:bg-brand-darkMedium"
                    hoverContainerDimensions="w-[2.9rem] h-[2.9rem]"
                    to="#top"
                    fontSize="text-[4rem]"
                >
                    <IoMdArrowDropup className="relative top-[-0.125rem]" />
                </IconLink>
            </div>
        </div>
    </footer>;
}