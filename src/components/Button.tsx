import classNames from "classnames";
import type { MouseEvent } from "react";
import { useFormStatus } from "react-dom";
import { IoReloadSharp } from "react-icons/io5";

interface ButtonProps {
    regular?: boolean;
    danger?: boolean;
    children: string;
    fontSize?: string;
    onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
    disabled?: boolean;
    className?: string;
    type?: "button" | "submit";
    isInActionForm?: boolean;
    width?: string;
}

function Button({
    regular = false,
    danger = false,
    children,
    fontSize = 'text-base',
    onClick,
    disabled = false,
    className = '',
    type = "button",
    width = '',
}: ButtonProps) {
    const { pending } = useFormStatus();

    const spanClassName = classNames(
        'inline-block',
        'text-brand-extraLight font-semibold',
        'px-[0.6em] py-[0.2em]',
        'border-[0.1em] border-brand-extraDark',
        'relative bottom-[0.4em] z-10',
        'transition-transform duration-[0.07s] ease-out',
        'group-hover:translate-y-[0.2em]',
        'group-active:translate-y-[0.4em] group-active:duration-[0.01s] group-active:ease-in',
        {
            'bg-brand-medium': regular,
            'bg-brand-accent': danger,
            [`
                translate-y-[0.4em] group-hover:translate-y-[0.4em]
                bg-brand-neutral border-brand-lightMedium 
            `]: disabled || pending,
            [width]: !!width,
        },
    );

    return <button disabled={disabled || pending} onClick={onClick} type={type} className={`
        relative w-max group 
        before:content-[''] before:bg-brand-extraDark 
        before:absolute before:inset-0 before:z-0
        ${fontSize} ${className}
    `}>
        <span className={spanClassName}>
            {
                !pending ?
                    children :
                    <IoReloadSharp className="text-brand-extraLight animate-spin mx-auto" />
            }
        </span>
    </button>;
}

export default Button;