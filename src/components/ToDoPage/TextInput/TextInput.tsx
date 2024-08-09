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
}

export default function TextInput({ value, onChange, onSubmit, labelText, inputFieldWidth }: TextInputType) {
    const labelClassName = classNames('transition-transform text-2xl', {
        'translate-x-[0.55rem] translate-y-[2.05rem] text-brand-regular': value.length <= 0,
        'translate-x-[0] translate-y-[0] text-brand-lightMedium font-medium': value.length > 0,
    })

    return <form onSubmit={onSubmit} className="flex items-start flex-col relative">
        <label className={labelClassName} htmlFor="new-task">{labelText}</label>
        <input id="new-task" value={value} onChange={onChange} type="text" className={`
            border-brand-regular
            border
            text-2xl
            text-brand-dark
            pl-2 
            w-[29.5rem]
            focus:outline-none
            focus:outline-brand-lightMedium
            focus:outline-offset-[-1px]
            focus:rounded-none
            ${inputFieldWidth}
        `} />
    </form>;
}