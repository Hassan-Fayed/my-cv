import Link from "next/link";
import { IoPhonePortraitSharp } from "react-icons/io5";
import { IoMailSharp } from "react-icons/io5";
import { IoChatboxEllipsesSharp } from "react-icons/io5";

import GeneralNav from "@/components/GeneralNav";
import paths from "@/utils/paths";

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
                <ul className="
                    text-[1.875em] text-brand-extraDark font-medium relative
                    flex flex-col items-start gap-[0.75em]
                ">
                    <li>
                        <a
                            className="flex items-center gap-[0.75em] hover:underline"
                            href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
                        >
                            <IoPhonePortraitSharp className="relative left-[0.12em]" />
                            {process.env.NEXT_PUBLIC_PHONE + ' - ' + process.env.NEXT_PUBLIC_COUNTRY}
                        </a>
                    </li>
                    <li>
                        <a
                            className="flex items-center gap-[0.75em] hover:underline"
                            href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                        >
                            <IoMailSharp className="relative top-[0.1em]" />
                            {process.env.NEXT_PUBLIC_EMAIL}
                        </a>
                    </li>
                    <li>
                        <Link
                            className="flex items-center gap-[0.75em] hover:underline"
                            href={paths.comments()}
                        >
                            <IoChatboxEllipsesSharp />
                            Add a comment
                        </Link>
                    </li>
                </ul>
            </div>
        </main>
    </>;
}