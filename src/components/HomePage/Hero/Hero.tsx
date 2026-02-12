'use client';

import './hero.css';

import { useRef, useCallback } from 'react';
import Link from 'next/link';

import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";

import CanvasShow from './CanvasShow';
import tenValuesImage from '@/assets/ten-values-image.png';
import paths from '@/utils/paths';
import HomeNavBar from '../HomeNav/HomeNavBar';
import { pressStart2pFont } from '@/utils/fonts';

export default function Hero() {
    const heroElementRef = useRef<HTMLDivElement>(null);

    const getCurrScrollInfo = useCallback(() => {
        if (!heroElementRef.current) return null;

        const documentElementScrollTop = document.documentElement.scrollTop;
        const heroElementHeight = parseFloat(getComputedStyle(heroElementRef.current).height);
        const scrollPercentage = Math.min(Math.floor(documentElementScrollTop / heroElementHeight * 100), 100);

        const pixelLength = Math.round(5 + ((45 / 100) * scrollPercentage)); // convert the range [0, 100] to be [5, 50]

        return { scrollPercentage, pixelLength };
    }, []);

    return <main className="h-[200svh] bg-brand-regular overflow-x-clip max-screen-s:h-[100svh]">
        <HomeNavBar className="sticky top-[0] left-[0] z-[10]" />
        <div ref={heroElementRef} className="
            h-[calc(100svh-3.7rem)] sticky top-[3.7rem]
            pl-11 max-screen-2xs:pl-6 
            flex items-end
            max-screen-s:items-center
        ">
            <div className="max-w-container-width mx-auto flex">
                {/* left column */}
                <div className="
                    z-1
                    self-center
                    w-1/2 text-[1rem]
                    flex flex-col items-start 
                    max-screen-md:text-[0.95rem] 
                    max-screen-smd:text-[0.85rem]
                    max-screen-s:text-[1rem] max-screen-s:w-auto
                    max-screen-xs:text-[0.7rem]
                    max-screen-2xs:text-[0.54rem]
                ">
                    <h1 className={`
                        ${pressStart2pFont.className}
                        uppercase 
                        text-[4.5em]
                        text-brand-dark 
                        leading-none
                        font-bold
                        mb-[0.5rem]
                    `}>
                        Hassan<br /> Fa<span className="relative right-[0.25rem]">y</span>ed
                    </h1>
                    <h3 className="
                        text-[2.25em] font-bold uppercase text-nowrap
                        mb-[0.5em]
                        text-brand-dark
                        relative left-[-0.1875rem] top-[-0.75rem]
                    ">
                        Front-end developer
                    </h3>
                    <div id="call-to-action" className="relative">
                        <IoMdArrowDropright className="
                            text-[max(2.7em,2rem)]
                            text-brand-extraLight 
                            absolute
                            left-[-1.1em]
                            top-[0.175em]
                            max-screen-xl:hidden
                            max-screen-s:inline-block
                            max-screen-xs:top-[0.131em] max-screen-xs:left-[-1.06em]
                            max-screen-2xs:top-[-0.02em] max-screen-2xs:left-[-1em]
                            max-screen-3xs:hidden
                        "/>
                        <Link href={paths.contactInfo()}
                            className={`
                                ${pressStart2pFont.className}
                                hover:underline uppercase 
                                text-[2.7em] text-brand-extraLight text-nowrap 
                                inline-block overflow-x-hidden w-[9.88em]
                            `}
                        >
                            Contact me
                        </Link>
                        <IoMdArrowDropleft className="
                            text-[max(2.7em,2rem)]
                            text-brand-extraLight
                            absolute right-[-1.1em] top-[0.175em]
                            max-screen-xl:hidden
                            max-screen-s:inline-block
                            max-screen-xs:top-[0.131em] max-screen-xs:right-[-1.06em]
                            max-screen-2xs:top-[-0.02em] max-screen-2xs:right-[-1em]
                            max-screen-3xs:hidden
                        "/>
                    </div>
                </div>
                {/* right column */}
                <div className="
                    w-1/2
                    relative z-0
                    flex justify-center
                    max-screen-s:hidden
                ">
                    <div className="
                        text-[1rem]
                        relative
                        max-screen-2xl:right-[3rem]
                        max-screen-lg:right-[6rem]
                        max-screen-slg:right-[7rem] max-screen-slg:text-[0.93rem]
                        max-screen-lmd:right-[10rem]
                        max-screen-md:right-[12rem] max-screen-md:text-[0.8rem]
                        max-screen-smd:right-[14rem]
                    ">
                        <CanvasShow tenValuesImage={tenValuesImage} getCurrScrollInfo={getCurrScrollInfo} />
                    </div>
                </div>
            </div>
        </div>
    </main>;
}