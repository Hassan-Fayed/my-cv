import 'server-only';

import { z } from 'zod';
import { cookies } from "next/headers";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { setPersistence, inMemoryPersistence, signInAnonymously } from "firebase/auth";
import { adminAuth } from "@/firebase/firebaseAdminConfig";
import { auth } from '@/firebase/firebaseConfig';

import hash from "@/utils/hash";
import { DecodedIdToken } from "firebase-admin/auth";
import type { signInReturnValue } from '.';

async function signUp(): Promise<signInReturnValue> {
    try {
        await setPersistence(auth, inMemoryPersistence);
        const userCredential = await signInAnonymously(auth);

        const idToken = await userCredential.user.getIdToken();

        const expiresIn = 1000 * 60 * 60 * 24 * 5;
        const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

        const options = {
            name: 'sessionCookie',
            value: sessionCookie,
            maxAge: 1000 * 60 * 60 * 24 * 5,
            httpOnly: true,
            secure: true,
            sameSite: 'strict' as const,
        };
        const cookieStore = cookies();
        cookieStore.set(options);

        auth.signOut();

        return { state: 'success', message: 'Please, feel free to add your comment.' };
    } catch (err) {
        return { state: 'danger', message: 'Something went wrong. Please, try again later.' };
    }
}

async function checkAntiCSRFTokenValidity(antiCSRFToken: string, cookieStore: ReadonlyRequestCookies) {
    //hash the recieved anti-csrf token
    const hashedReceivedCSRFToken = await hash(antiCSRFToken);

    //get the anti-csrf token in cookies
    const antiCSRFTokenInCookie = cookieStore.get('antiCSRFToken')?.value;

    // request validation against csrf attacks
    if (!antiCSRFToken || !antiCSRFTokenInCookie || antiCSRFTokenInCookie !== hashedReceivedCSRFToken)
        return false;   //unauthorized
    else
        return true;    //authorized
}

async function checkCurrUser(): Promise<DecodedIdToken | null> {
    const cookieStore = cookies();
    const currSessionCookie = cookieStore.get('sessionCookie')?.value;

    if (currSessionCookie) {
        try {
            const decodedClaims = await adminAuth.verifySessionCookie(currSessionCookie);
            return decodedClaims;
        } catch (err) {
            return null;
        }
    }

    return null;
}

function validateAddComment(name: FormDataEntryValue | null, content: FormDataEntryValue | null) {
    const nameSchema = z
        .string()
        .min(1, { message: 'Your name must contain at least 1 character.' })
        .max(35, { message: 'Your name must contain at most 35 characters.' })
        .regex(/^[A-Za-z-'\s]+$/, { message: 'Your name can only contain letters, hyphens, apostrophes, and spaces.' });
    const contentSchema = z
        .string()
        .min(2, { message: 'Your comment must contain at least 2 character.' })
        .regex(/^[^><\[\]\\\/|]+$/, {
            message: 'Your comment can not contain special characters.'
        });

    const nameParseResult = nameSchema.safeParse(name);
    const contentParseResult = contentSchema.safeParse(content);

    if (nameParseResult.error)
        return { message: String(JSON.parse(nameParseResult.error.message)[0].message) };
    if (contentParseResult.error)
        return { message: String(JSON.parse(contentParseResult.error.message)[0].message) };

    return { message: '' };
}

function validateEditComment(newContent: FormDataEntryValue | null) {
    const newContentSchema = z
        .string()
        .min(2, { message: 'Your comment must contain at least 2 character.' })
        .regex(/^[^><\[\]\\\/|]+$/, {
            message: 'Your comment can not contain special characters.'
        });

    const newContentParseResult = newContentSchema.safeParse(newContent);

    if (newContentParseResult.error)
        return { message: String(JSON.parse(newContentParseResult.error.message)[0].message) };

    return { message: '' };
}

async function verifyReCaptchaToken(token: string): Promise<boolean> {
    const reCaptchaResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`, {
        method: 'POST',
        mode: 'cors',
    });
    const reCaptchaResponseData = await reCaptchaResponse.json();
    if (!reCaptchaResponseData.success)
        return false;
    return true;
}

export {
    signUp,
    checkAntiCSRFTokenValidity,
    validateAddComment,
    checkCurrUser,
    validateEditComment,
    verifyReCaptchaToken,
};