import Link from 'next/link';

import ToTop from './ToTop';

export default function Footer() {
    return <footer className="h-[61.805svh] bg-brand-dark flex justify-center relative">
        <div className="
            max-w-container-width 
            flex flex-col justify-center items-center
            text-[1rem]
            max-screen-md:text-[0.9rem]
            max-screen-s:text-[0.8rem]
            max-screen-2xs:text-[0.7rem]
            max-screen-3xs:text-[0.6rem]
        ">
            <p className="text-brand-regular text-[max(1.875em,1rem)] mb-[0.5em]">
                {'I appreciate your visit (^_^)'}
            </p>
            <Link href="/contact-info" className="
                text-[#529989]
                text-[max(1.875em,1rem)]
                hover:text-brand-light
                transition-colors
            ">Contact me</Link>
            <ToTop />
        </div>
    </footer>;
}