'use server';

import { revalidatePath } from "next/cache";
import { getDatabase } from 'firebase-admin/database';
import { cookies } from "next/headers";
import { adminAuth, adminApp } from "@/firebase/firebaseAdminConfig";

import paths from "@/utils/paths";
import {
    signUp,
    checkAntiCSRFTokenValidity,
    validateAddComment,
    checkCurrUser,
    validateEditComment,
    verifyReCaptchaToken,
} from './actionsHelper';

export async function addComment(
    antiCSRFToken: string,
    reCaptchaToken: string | null,
    formState: { message: string },
    formData: FormData
) {
    // verify the reCaptcha token
    if (reCaptchaToken === null)
        return { message: 'Something went wrong. Please try again latter' };

    const isValidReCaptchaToken = await verifyReCaptchaToken(reCaptchaToken);
    if (!isValidReCaptchaToken)
        return { message: 'Error: 403 UNAUTHORIZED!' };

    // check anti-csrf token validity
    const cookieStore = await cookies();
    const isValidAntiCSRFToken = await checkAntiCSRFTokenValidity(antiCSRFToken, cookieStore);
    if (!isValidAntiCSRFToken)
        return { message: 'Error: 403 UNAUTHORIZED!' };

    // check the current logged in user and get his uid
    const currUserUid = (await checkCurrUser())?.uid;
    if (!currUserUid)
        return { message: 'Something went wrong. Please, try reloading this page.' };

    // get data from formData
    const name = formData.get('name');
    const content = formData.get('content');

    // validate data
    const errorMessageObj = validateAddComment(name, content);
    if (errorMessageObj.message) return errorMessageObj;

    // add the new comment to the database
    try {
        const db = getDatabase(adminApp);
        const commentsRef = db.ref('/comments');
        await commentsRef.push({
            name: String(name).trim(),
            content: String(content).trim(),
            ownerUid: currUserUid
        });
    } catch (err) {
        return { message: 'Something went wrong. Please, try again latter.' };
    }


    // revalidate the comments page to show new data
    revalidatePath(paths.comments());
    // return empty message to the from in the client side
    return { message: '' };
}

export async function deleteComment(
    commentId: string,
    ownerUid: string,
    antiCSRFToken: string,
    deleteFormState: { message: string },
    formData: FormData
) {
    // check anti-csrf token validity
    const cookieStore = await cookies();
    const isValidAntiCSRFToken = await checkAntiCSRFTokenValidity(antiCSRFToken, cookieStore);
    if (!isValidAntiCSRFToken)
        return { message: '403 UNAUTHORIZED!' };

    // check if the current user owns the comment he's attempting to delete
    const currUserUid = (await checkCurrUser())?.uid;
    if (!currUserUid)
        return { message: 'Something went wrong. Please, try reloading this page.' };
    if (currUserUid !== ownerUid)
        return { message: 'Error: Unauthorized!' };

    // delete the comment
    const db = getDatabase(adminApp);
    const commentToBeDeletedRef = db.ref(`/comments/${commentId}`);
    await commentToBeDeletedRef.set(null);

    // revalidate the comments page
    revalidatePath(paths.comments());
    return { message: '' };
}

export async function editComment(
    commentId: string,
    ownerUid: string,
    antiCSRFToken: string,
    editFormState: { message: string },
    formData: FormData
) {
    // check anti-csrf token validity
    const cookieStore = await cookies();
    const isValidAntiCSRFToken = await checkAntiCSRFTokenValidity(antiCSRFToken, cookieStore);
    if (!isValidAntiCSRFToken)
        return { message: '403 UNAUTHORIZED!' };

    // check if the current user owns the comment he's attempting to edit
    const currUserUid = (await checkCurrUser())?.uid;
    if (!currUserUid)
        return { message: 'Something went wrong. Please, try reloading this page.' };
    if (currUserUid !== ownerUid)
        return { message: 'Error: Unauthorized!' };

    // get the new content of the comment to be edited
    const newContent = formData.get('newContent');

    // validate the new content
    const errorMessageObj = validateEditComment(String(newContent).trim());
    if (errorMessageObj.message)
        return { message: errorMessageObj.message };

    // modify the content of the comment in the database
    try {
        const db = getDatabase(adminApp);
        const commentToBeEditedRef = db.ref(`/comments/${commentId}`);
        commentToBeEditedRef.update({
            'content': String(newContent).trim(),
        })
    } catch (err) {
        return { message: String(err) };
    }

    // revalidate the comments page
    revalidatePath(paths.comments());
    return { message: '' };
}

export interface signInReturnValue {
    state: 'success' | 'warning' | 'danger';
    message: string;
}

export async function signIn(antiCSRFToken: string): Promise<signInReturnValue> {
    const cookieStore = await cookies();

    //check if there is a user session
    const currSessionCookie = cookieStore.get('sessionCookie')?.value;
    if (currSessionCookie) {
        try {
            // check anti-csrf token validity
            const isValidAntiCSRFToken = await checkAntiCSRFTokenValidity(antiCSRFToken, cookieStore);
            if (!isValidAntiCSRFToken)
                return { state: 'danger', message: 'Error: 403 UNAUTHORIZED!' };

            // check the validity of the current user session
            const decodedClaims = await adminAuth.verifySessionCookie(currSessionCookie, true);
            return { state: 'success', message: 'Please, feel free to add your comment.' };
        } catch (err) {
            const messageObj = await signUp();
            return messageObj;
        }
    } else {
        const messageObj = await signUp();
        return messageObj;
    }
}

export async function getCurrUserUid(): Promise<string | null> {
    const currUserUid = (await checkCurrUser())?.uid;

    if (!currUserUid)
        return null;

    return currUserUid;
}