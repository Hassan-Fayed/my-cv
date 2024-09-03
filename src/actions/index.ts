'use server';
import { revalidatePath } from "next/cache";
import { push } from "firebase/database";

import paths from "@/utils/paths";
import { getCommentsFirebaseRef } from "@/utils/firebaseConfig";

export async function addComment(formData: FormData) {
    const name = formData.get('name');
    const content = formData.get('content');

    const commentsRef = getCommentsFirebaseRef();
    await push(commentsRef, { name, content });

    revalidatePath(paths.comments());
}