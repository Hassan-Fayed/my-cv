import { IoPhonePortraitSharp } from "react-icons/io5";
import { IoMailSharp } from "react-icons/io5";

import GeneralNav from "@/components/GeneralNav";

import { Press_Start_2P } from "next/font/google";

const pressStart2p = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export default function ContactInfoPage() {
    return <>
        <GeneralNav title="Contact me" />
        <main className="bg-brand-light h-general-container-height w-full">
            <div className="
                w-container-width 
                m-auto 
                pt-[9.688rem]
            ">
                <h2 className={`
                    ${pressStart2p.className} 
                    text-[3.6rem] 
                    mb-12
                `}>Info:</h2>
                <ul className="text-3xl text-brand-extraDark font-medium relative">
                    <li>
                        <a
                            className="flex items-center gap-5 mb-6 hover:underline"
                            href="tel:"
                        >
                            <IoPhonePortraitSharp />
                            +971-XX-1234567 - UAE
                        </a>
                    </li>
                    <li>
                        <a
                            className="flex items-center gap-5 hover:underline"
                            href="mailto:fayed.hassan.aly@gmail.com"
                        >
                            <IoMailSharp />
                            fayed.hassan.aly@gmail.com
                        </a>
                    </li>
                </ul>
            </div>
        </main>
    </>;
}