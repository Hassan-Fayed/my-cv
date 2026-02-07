'use client';

import './hero.css';

import { useRef, useCallback } from 'react';
import Link from 'next/link';
import { Press_Start_2P } from 'next/font/google';

import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";

import CanvasShow from './CanvasShow';
import tenValuesImage from '@/assets/ten-values-image.png';
import paths from '@/utils/paths';
import HomeNavBar from '../HomeNav/HomeNavBar';

const pressStart2p = Press_Start_2P({ weight: '400', subsets: ['latin'] });

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

    return <main className="h-[calc(200svh-3.7rem)] bg-brand-regular overflow-x-clip">
        <HomeNavBar className="sticky top-[0] left-[0] z-[10]" />
        <div ref={heroElementRef} className="
            sticky top-[3.7rem] left-[0]
            px-11 screen-2xs:px-6 
        ">
            <div className="
                h-[calc(100svh-3.7rem)] max-w-container-width mx-auto 
                flex items-end 
            ">
                {/* left column */}
                <div className="
                    w-1/2
                    text-[1rem]
                    flex flex-col items-start
                    relative bottom-[10.25rem] z-10
                    screen-slg:text-[0.95rem] screen-slg:bottom-[7.35rem]
                    screen-md:text-[0.8rem] screen-md:bottom-[6.7rem]
                    screen-smd:text-[0.7rem] screen-smd:bottom-[8rem]
                    screen-s:text-[1rem] screen-s:bottom-[0] screen-s:mx-auto 
                    screen-s:w-auto screen-s:self-center
                    screen-xs:text-[0.7rem]
                    screen-2xs:text-[0.54rem]
                ">
                    <h1 className={`
                        ${pressStart2p.className}
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
                            screen-xl:hidden
                            screen-s:inline-block
                            screen-xs:top-[0.131em] screen-xs:left-[-1.06em]
                            screen-2xs:top-[-0.02em] screen-2xs:left-[-1em]
                            screen-3xs:hidden
                        "/>
                        <Link href={paths.contactInfo()}
                            className={`
                                ${pressStart2p.className}
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
                            screen-xl:hidden
                            screen-s:inline-block
                            screen-xs:top-[0.131em] screen-xs:right-[-1.06em]
                            screen-2xs:top-[-0.02em] screen-2xs:right-[-1em]
                            screen-3xs:hidden
                        "/>
                    </div>
                </div>
                {/* right column */}
                <div className="
                    w-1/2
                    relative z-0
                    flex justify-center
                    relative 
                    screen-s:hidden
                ">
                    <div className="
                        text-[1rem]
                        relative 
                        screen-2xl:right-[3rem]
                        screen-slg:text-[0.9rem]
                        screen-md:text-[0.8rem]
                    ">
                        <CanvasShow tenValuesImage={tenValuesImage} getCurrScrollInfo={getCurrScrollInfo} />
                    </div>
                </div>
            </div>
        </div>
    </main>;
}