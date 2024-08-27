import { IoPhonePortraitSharp } from "react-icons/io5";
import { IoMailSharp } from "react-icons/io5";

import GeneralNav from "@/components/GeneralNav";

import { Press_Start_2P } from "next/font/google";

const pressStart2p = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export default function ContactInfoPage() {
    return <>
        <GeneralNav title="Contact me" />
        <main className="bg-brand-light min-h-general-container-height">
            <div className="
                text-[1rem]
                px-[2.168rem] pt-[9.688rem]
                max-w-container-width 
                m-auto 
                screen-s:text-[0.9rem]
                screen-xs:text-[0.8rem]
                screen-2xs:text-[0.7rem]
                screen-3xs:text-[0.6rem]
                screen-4xs:text-[0.534rem]
            ">
                <h2 className={`
                    ${pressStart2p.className} 
                    text-[3.6em] 
                    mb-[0.75em]
                `}>
                    Info:
                </h2>
                <ul className="text-[1.875em] text-brand-extraDark font-medium relative">
                    <li className="mb-[0.75em]">
                        <a
                            className="flex items-center gap-[0.75em] hover:underline"
                            href="tel:"
                        >
                            <IoPhonePortraitSharp className="" />
                            +971-XX-1234567 - UAE
                        </a>
                    </li>
                    <li>
                        <a
                            className="flex items-center gap-[0.75em] hover:underline"
                            href="mailto:fayed.hassan.aly@gmail.com"
                        >
                            <IoMailSharp className="" />
                            fayed.hassan.aly@gmail.com
                        </a>
                    </li>
                </ul>
            </div>
        </main>
    </>;
}