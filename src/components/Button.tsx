import type { MouseEvent } from "react";

import classNames from "classnames";

interface ButtonProps {
    regular?: boolean;
    danger?: boolean;
    children: string;
    parentBackgroundColor: string;
    fontSize?: string;
    onClick: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
    disabled?: boolean;
    className?: string;
}

function Button({
    regular = false,
    danger = false,
    children,
    parentBackgroundColor,
    fontSize = 'text-base',
    onClick,
    disabled = false,
    className = "",
}: ButtonProps) {
    const buttonClassName = classNames(
        'align-top',
        'text-brand-extraLight',
        'font-semibold',
        'px-[0.75em]',
        'py-[0.25em]',
        'tracking-wide',
        'm-0',
        {
            'bg-brand-medium': !!regular,
            'bg-brand-accent': !!danger,
            'bg-brand-neutral': !!disabled,
        },
    );

    return <div className={`relative w-max h-max inline-block ${fontSize} ${className}`}>
        <div className={`${parentBackgroundColor} w-[0.3em] h-[0.3em] absolute left-[0] top-[0]`}></div>
        <div className={`${parentBackgroundColor} w-[0.3em] h-[0.3em] absolute left-[0] bottom-[0]`}></div>
        <div className={`${parentBackgroundColor} w-[0.3em] h-[0.3em] absolute right-[0] top-[0]`}></div>
        <div className={`${parentBackgroundColor} w-[0.3em] h-[0.3em] absolute right-[0] bottom-[0]`}></div>
        <button disabled={disabled} onClick={onClick} className={buttonClassName} type="button">{children}</button>
    </div>;
}

// Button.propoTypes = {
//     checkVariationValue: ({ regular, danger }: ButtonProps) => {
//         const count = Number(regular) + Number(danger);

//         if (count > 1)
//             return new Error('Only one value of the props \'regular\' and \'danger\' can be set to true');
//     }
// }

export default Button;