'use client'

import type { Dispatch } from "react";
import type { SetStateAction } from "react";

import classNames from "classnames";

interface RadioPropsType {
    value: boolean;
    setValue: Dispatch<SetStateAction<boolean>>;
    className: string;
}

export default function Switch({ value, setValue, className }: RadioPropsType) {
    const handleChange = () => {
        if (!value) setValue(true);
        else setValue(false);
    }

    const labelClassName = classNames(
        'h-[1.5em] w-[6.989em] relative cursor-pointer',
        'before:h-[1.5em] before:px-[0.5em] before:bg-brand-light',
        'before:box-border before:border-[0.188em] before:border-solid',
        'before:flex before:justify-center before:items-center',
        'before:text-[1em]',
        'before:absolute before:top-[0] before:left-[0]',
        'transition-all before:transition-all',
        {
            "bg-brand-medium before:content-['Add'] before:text-brand-medium before:border-brand-medium": !value,
            "bg-brand-accent before:content-['Delete'] before:text-brand-accent before:border-brand-accent": value,
            'before:translate-x-[2.669em]': value,
        }

    )

    return <label className={`${labelClassName} ${className}`}>
        <input checked={value} onChange={handleChange} className="hidden" type="checkbox" />
    </label>;
}