import Link from "next/link";

interface NavLinkProps {
    children: string;
    to: string;
}

export default function NavLink({ to, children }: NavLinkProps) {
    return <Link className="
        font-bold
        text-brand-lightMedium
        hover:text-brand-extraDark
        flex 
        justify-center 
        items-center
        after:content-['']
        after:absolute
        after:bottom-[0]
        after:left-[0]
        after:w-full
        after:bg-brand-extraDark
        after:w-full
        after:h-1
        after:opacity-0
        after:hover:opacity-100
        after:transition-opacity
        transition-colors
        text-nowrap
    " href={to}>{children}</Link>;
}