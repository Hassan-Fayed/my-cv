'use client';

import { useRef } from "react";
import classNames from "classnames";

import { addComment } from "@/actions";
import Button from "../Button";


interface AddCommentPropsType {
    className?: string;
}

export default function AddComment({ className = '' }: AddCommentPropsType) {
    const formRef = useRef<HTMLFormElement>(null);

    const formClassName = classNames('flex flex-col gap-[1.2rem]', {
        [className]: !!className,
    });

    return <form ref={formRef} className={formClassName} action={
        async (formData: FormData) => {
            formRef.current?.reset();
            await addComment(formData);
        }
    }>
        <label className="
                flex flex-col 
                text-brand-medium 
                transition-[font-weight]
        ">
            Enter your name:
            <input
                name="name"
                type="text"
                required
                maxLength={35}
                className="
                    mt-[0.25rem]
                    text-[1.3rem] screen-4xs:text-[1rem]
                    pl-[0.5rem]
                    border border-brand-regular
                    focus:outline-none focus:outline-brand-lightMedium
                    focus:outline-offset-[-1px] focus:rounded-none
                " />
        </label>

        <fieldset className="flex flex-col">
            <label className="
                text-brand-medium 
                flex flex-col
                transition-[font-weight]
            ">
                Enter your comment:
                <textarea name="content" required className="
                    resize-none
                    mt-[0.25rem] px-[0.5rem]
                    text-[1.3rem] screen-4xs:text-[1rem]
                    border border-brand-regular
                    focus:outline-none focus:outline-brand-lightMedium
                    focus:outline-offset-[-1px] focus:rounded-none
                "></textarea>
            </label>
        </fieldset>

        <Button
            regular
            type="submit"
            className="self-end mt-[0.4rem] text-[1rem]"
            width="w-[8.33rem]"
        >
            Add Comment
        </Button>
    </form>;
}