'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Press_Start_2P } from 'next/font/google';

import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";

import CanvasShow from './CanvasShow';
import tenValuesImage from '../../../public/ten-values-image.png';
import paths from '@/utils/paths';

const pressStart2p = Press_Start_2P({ weight: '400', subsets: ["latin"] });


export default function Hero() {
    const [scrollTopValue, setScrollTopValue] = useState(0);
    const [heroElementHeight, setHeroElementHeight] = useState(1);

    const heroElementRef = useRef(null);

    const scrollPercentage = Math.floor(scrollTopValue / heroElementHeight * 100);
    const pixelLength = Math.round(5 + ((45 / 100) * scrollPercentage)); // convert the range [0, 100] to be [5, 50]

    useEffect(() => {
        const handleScroll = () => {
            setScrollTopValue(document.documentElement.scrollTop);
            if (!heroElementRef.current) return;
            setHeroElementHeight(parseInt(getComputedStyle(heroElementRef.current).height));
        };

        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return <main className="h-[200svh] w-full bg-brand-regular flex justify-center overflow-x-clip">
        <section ref={heroElementRef} className="
            h-svh 
            flex
            justify-between
            sticky 
            top-[0]
            left-[0]
            max-w-container-width
        ">
            {/* left column */}
            <div className="flex flex-col justify-center">
                <div className="relative top-[60px]">
                    <h1 className={`
                        uppercase 
                        text-brand-dark 
                        ${pressStart2p.className}
                        text-[4.5rem]
                        leading-none
                        font-bold
                    `}>Hassan<br /> Fa<span className="relative right-[0.25rem]">y</span>ed</h1>
                    <h3 className="
                        uppercase 
                        font-bold 
                        text-brand-dark
                        text-[2.25rem]
                        relative
                        left-[-0.1875rem]
                        top-[-0.75rem]
                        text-nowrap
                    ">Front-end developer</h3>

                    <div id="call-to-action" className="
                        flex 
                        items-center 
                        relative 
                        left-[-2.75rem] 
                        top-[0.9rem]
                    ">
                        <IoMdArrowDropright className="
                            text-[2.8rem] 
                            text-brand-extraLight 
                            relative 
                            top-[-0.2rem]
                        " />
                        <Link href={paths.contactInfo()} className={`
                            hover:underline 
                            uppercase 
                            ${pressStart2p.className}
                            text-brand-extraLight
                            text-[2.8rem]
                            text-nowrap
                        `}>Contact me</Link>
                        <IoMdArrowDropleft className="
                            text-[2.8rem] 
                            text-brand-extraLight 
                            relative 
                            top-[-0.2rem]
                        "/>
                    </div>
                </div>
            </div>
            {/* right column */}
            <div className="self-end relative right-[7.9rem]">
                <div className={`
                    ${pressStart2p.className}
                    text-[1.5rem]
                    text-brand-light
                    absolute
                    bottom-[6.9rem]
                    right-[10rem]
                `}>{scrollPercentage + '%'}</div>
                <CanvasShow tenValuesImage={tenValuesImage} pixelLength={pixelLength} />
            </div>
        </section>
    </main>;
}