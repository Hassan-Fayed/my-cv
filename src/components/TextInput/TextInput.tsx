'use client'

import './text-input.css';

import type { ChangeEvent, FormEvent } from "react";

import classNames from "classnames";

interface TextInputType {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    labelText: string;
    inputFieldWidth: string;
    inputUniqueId: string;
    parentFontSize: string;
    className?: string;
    parentFormClassName?: string;
    maxLength?: number;
}

export default function TextInput({
    value,
    onChange,
    onSubmit,
    labelText,
    inputFieldWidth,
    inputUniqueId,
    parentFontSize,
    className = '',
    parentFormClassName = '',
    maxLength,
}: TextInputType) {
    const labelClassName = classNames('transition-transform text-[max(1.5em,1rem)]',
        {
            'translate-x-[0.55em] translate-y-[1.45em] text-brand-regular': value.length <= 0,
            'translate-x-[0] translate-y-[0] text-brand-lightMedium font-medium': value.length > 0,
        }
    );

    return <form onSubmit={onSubmit} className={`
        ${parentFontSize}
        ${inputFieldWidth}
        flex flex-col items-start 
        relative
        ${parentFormClassName}
    `}>
        <label className={labelClassName} htmlFor={inputUniqueId}>{labelText}</label>
        <input
            maxLength={maxLength}
            id={inputUniqueId}
            value={value}
            onChange={onChange}
            type="text"
            className={`
                dynamic-label-input
                w-full
                border border-brand-regular
                text-[max(1.5em,1rem)] text-brand-dark
                pl-[0.5em] leading-[0]
                focus:outline-none focus:outline-brand-lightMedium
                focus:outline-offset-[-1px] focus:rounded-none
                ${className}
            `}
        />
    </form>;
}