'use client';

import Link from "next/link";
import { IoWarningSharp } from "react-icons/io5";

import paths from "@/utils/paths";

export default function Error() {
    return <div className="h-svh flex flex-col justify-center items-center bg-brand-light px-[2.168rem]">
        <IoWarningSharp className="text-[7rem] text-brand-accent mb-[1rem]" />
        <div className="mb-[2.5rem] text-center">
            <h1 className="
                text-[2rem] 
                text-brand-dark 
                font-medium 
                leading-none
                mb-[0.3rem]
            ">
                Something went wrong!
            </h1>
            <p className="text-[1.236rem] text-brand-dark font-medium">Please try again latter</p>
        </div>
        <Link
            className="
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
                Go to home page
            </span>
        </Link>
    </div>;
}