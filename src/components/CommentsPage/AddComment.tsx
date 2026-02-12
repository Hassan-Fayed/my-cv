'use client';

import './add-comment.css';

import { useRef, useState, useEffect } from "react";
import classNames from "classnames";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { addComment } from "@/actions";
import Button from "../Button";
import FormMessage from "./FormMessage";
import { signIn } from '@/actions';
import type { signInReturnValue } from "@/actions";
import setAntiCSRFCookie from "@/utils/setAntiCSRFCookie";


interface AddCommentPropsType {
    className?: string;
}

export default function AddComment({ className = '' }: AddCommentPropsType) {
    const { executeRecaptcha } = useGoogleReCaptcha();

    const formRef = useRef<HTMLFormElement>(null);

    // instead of useFormState
    const [addCommentFormState, setAddCommentFormState] = useState({
        message: '',
    });

    const [isShowMessage, setIsShowMessage] = useState(false);

    const [authMessage, setAuthMessage] = useState<signInReturnValue>({
        state: 'warning',
        message: 'Please, hold on for a moment.',
    });

    const handleReCaptchaVerify = async () => {
        if (!executeRecaptcha)
            return null;

        const token = await executeRecaptcha('yourAction');
        return token;
    };


    useEffect(() => {
        (async () => {
            const antiCSRFToken = await setAntiCSRFCookie();

            const message = await signIn(antiCSRFToken);
            setAuthMessage(message);
        })();
    }, []);

    const formClassName = classNames('flex flex-col gap-[1.2rem]', {
        [className]: !!className,
    });

    return <>
        {isShowMessage && addCommentFormState.message && <FormMessage
            danger
            message={addCommentFormState.message}
            className="mb-[1.2rem]"
            setIsShowMessage={setIsShowMessage}
        />}
        <form ref={formRef} className={formClassName} action={
            async (formData: FormData) => {
                formRef.current?.reset();
                const antiCSRFToken = await setAntiCSRFCookie();
                const reCaptchaToken = await handleReCaptchaVerify();
                const messageObj = await addComment(
                    antiCSRFToken,
                    reCaptchaToken,
                    addCommentFormState,
                    formData
                );
                setAddCommentFormState(messageObj);
                setIsShowMessage(true);
            }
        }>
            <fieldset className="flex flex-col">
                <label htmlFor="enter-comment-owner" className="transition-[font-weight] text-brand-medium">
                    Enter your name:
                </label>
                <input
                    id="enter-comment-owner"
                    disabled={authMessage.state !== 'success'}
                    required
                    name="name"
                    type="text"
                    maxLength={35}
                    className="
                        bg-[#FFF] text-brand-dark
                        mt-[0.25rem]
                        text-[1.3rem] screen-4xs:text-[1rem]
                        pl-[0.5rem]
                        outline-none border border-brand-regular
                        focus:border-brand-medium
                " />
            </fieldset>
            <fieldset className="flex flex-col">
                <label htmlFor="enter-comment-content" className="transition-[font-weight] text-brand-medium">
                    Enter your comment:
                </label>
                <textarea
                    id="enter-comment-content"
                    disabled={authMessage.state !== 'success'}
                    required
                    name="content"
                    className="
                        bg-[#FFF] text-brand-dark
                        resize-none
                        mt-[0.25rem] px-[0.5rem]
                        text-[1.3rem] screen-4xs:text-[1rem]
                        outline-none border border-brand-regular
                        focus:border-brand-medium
                    "
                ></textarea>
            </fieldset>
            <div className="mt-[0.4rem] flex justify-between items-end gap-[1rem]">
                <p className={`
                    px-[0.77rem] py-[0.48rem] self-stretch
                    text-[1rem] text-brand-extraLight tracking-wide font-bold 
                    flex justify-center items-center
                    ${(() => {
                        if (authMessage.state === 'danger') return 'bg-brand-accent';
                        if (authMessage.state === 'success') return 'bg-brand-darkerRegular';
                        if (authMessage.state === 'warning') return 'bg-brand-accent2 !text-brand-extraDark';
                    })()}
                `}>
                    {authMessage.message}
                </p>
                <Button
                    disabled={authMessage.state !== 'success'}
                    regular
                    type="submit"
                    className="text-[1rem]"
                    width="w-[8.33rem]"
                >
                    Add Comment
                </Button>
            </div>
        </form>
    </>;
}