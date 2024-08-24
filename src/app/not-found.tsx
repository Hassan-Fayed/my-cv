import Link from "next/link";

import paths from "@/utils/paths";

import { Press_Start_2P } from "next/font/google"

const pressStart2p = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export default function NotFound() {
    return <div className="
        w-full h-svh bg-brand-light 
        flex flex-col justify-center items-center gap-5
    ">
        <h1 className={`${pressStart2p.className} text-9xl text-brand-medium`}>404</h1>
        <p className="text-4xl text-brand-medium font-medium">Opps! Page not found.</p>
        <Link className="
            mt-10
            text-xl
            font-medium
            bg-brand-medium 
            text-brand-light 
            hover:bg-brand-darkRegular
            hover:text-brand-extraLight
            px-[0.75rem] py-[0.25rem]
            relative
        " href={paths.home()}>
            <div className="w-[0.3rem] h-[0.4rem] bg-brand-light absolute left-[0] top-[0]"></div>
            <div className="w-[0.3rem] h-[0.4rem] bg-brand-light absolute right-[0] top-[0]"></div>
            <div className="w-[0.3rem] h-[0.4rem] bg-brand-light absolute left-[0] bottom-[0]"></div>
            <div className="w-[0.3rem] h-[0.4rem] bg-brand-light absolute right-[0] bottom-[0]"></div>
            Back to home page
        </Link>
    </div>
}