import Link from "next/link";

import paths from "@/utils/paths";

import { Press_Start_2P } from "next/font/google"

const pressStart2p = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export default function NotFound() {
    return <div className="
        w-full h-svh bg-brand-light m-auto
        flex justify-center items-center
    ">
        <div className="flex flex-col items-center">
            <h1 className={`
                ${pressStart2p.className} 
                text-[5rem] 
                leading-none text-brand-medium
                relative left-[0.04em]
                mb-[0.3rem]
            `}>
                404
            </h1>
            <p className="text-[2rem] text-brand-dark font-medium">
                Page not found.
            </p>
            <Link
                className="
                    mt-[2.5rem]
                    relative w-max group 
                    before:content-[''] before:bg-brand-extraDark 
                    before:absolute before:inset-0 before:z-0
                "
                href={paths.home()}
            >
                <span className="
                    inline-block
                    text-brand-extraLight font-semibold text-[1rem]
                    px-[0.6em] py-[0.2em]
                    border-[0.1em] border-brand-extraDark
                    relative bottom-[0.4em] z-10
                    transition-transform duration-[0.07s] ease-out
                    group-hover:translate-y-[0.2em]
                    group-active:translate-y-[0.4em] group-active:duration-[0.01s] group-active:ease-in
                    bg-brand-medium
                ">
                    Back to home page
                </span>
            </Link>
        </div>
    </div>
}