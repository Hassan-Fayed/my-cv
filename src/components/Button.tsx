import classNames from "classnames";
import type { MouseEvent } from "react";

interface ButtonProps {
    regular?: boolean;
    danger?: boolean;
    children: string;
    fontSize?: string;
    onClick: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
    disabled?: boolean;
    className?: string;
}

function Button({
    regular = false,
    danger = false,
    children,
    fontSize = 'text-base',
    onClick,
    disabled = false,
    className = "",
}: ButtonProps) {
    const spanClassName = classNames(
        'inline-block',
        'text-brand-extraLight font-semibold',
        'px-[0.6em] py-[0.2em]',
        'border-[0.1em] border-brand-dark',
        'relative bottom-[0.4em] z-10',
        'group-hover:translate-y-[0.2em]',
        'transition-transform duration-[0.07s] ease-out',
        'group-active:translate-y-[0.4em] group-active:duration-[0.01s] group-active:ease-in ',
        {
            'bg-brand-medium': !!regular,
            'bg-brand-accent': !!danger,
            'bg-brand-neutral translate-y-[0.4em] border-brand-lightMedium group-hover:translate-y-[0.4em]': !!disabled,
        },
    );

    return <button disabled={disabled} onClick={onClick} type="button" className={`
        relative ${fontSize} ${className} w-max
        before:content-[''] before:bg-brand-dark 
        before:absolute before:inset-0 before:z-0
        group
    `}>
        <span className={spanClassName}>{children}</span>
    </button>;
}

export default Button;