'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import AddComment from './AddComment';

export default function AddCommentContainer() {
    return <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY as string}>
        <AddComment className="mb-[2.3rem]" />
    </GoogleReCaptchaProvider>
}