'use client'

import type { Dispatch } from "react";
import type { SetStateAction } from "react";

import classNames from "classnames";

interface RadioPropsType {
    value: boolean;
    setValue: Dispatch<SetStateAction<boolean>>;
}

export default function Switch({ value, setValue }: RadioPropsType) {
    const handleChange = () => {
        if (!value) setValue(true);
        else setValue(false);
    }

    const labelClassName = classNames(
        'h-[1.5rem] w-[6.989rem] relative cursor-pointer',
        'before:h-[1.5rem] before:px-[0.5rem] before:bg-brand-light',
        'before:box-border before:border-[0.188rem] before:border-solid',
        'before:flex before:justify-center before:items-center',
        'before:text-[1rem]',
        'before:absolute before:top-[0] before:left-[0]',
        'transition-all before:transition-all',
        {
            "bg-brand-medium before:content-['Add'] before:text-brand-medium before:border-brand-medium": !value,
            "bg-brand-accent before:content-['Delete'] before:text-brand-accent before:border-brand-accent": value,
            'before:translate-x-[2.669rem]': value,
        }

    )

    return <label className={labelClassName}>
        <input checked={value} onChange={handleChange} className="hidden" type="checkbox" />
    </label>;
}