'use client'

import './text-input.css';

import type { ChangeEvent, SubmitEvent } from "react";

import classNames from "classnames";

interface TextInputType {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
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
    className,
    parentFormClassName,
    maxLength,
}: TextInputType) {
    const inputClassName = classNames(
        'dynamic-label-input',
        'bg-[#FFF]',
        'w-full',
        'text-[max(1.5em,1rem)] text-brand-dark',
        'pl-[0.5em] leading-[0]',
        'outline-none border-2 border-brand-regular focus:border-brand-lightMedium',
        { [className || '']: className }
    );

    return <form onSubmit={onSubmit} className={`
        ${parentFontSize}
        ${inputFieldWidth}
        flex flex-col items-start 
        relative
        ${parentFormClassName ? parentFormClassName : ''}
    `}>
        <label htmlFor={inputUniqueId}>{labelText}</label>
        <input
            placeholder=" "
            maxLength={maxLength}
            id={inputUniqueId}
            value={value}
            onChange={onChange}
            type="text"
            className={inputClassName}
        />
    </form>;
}