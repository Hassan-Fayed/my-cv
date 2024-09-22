import 'server-only';

import { cache } from 'react';

import { adminDB } from '@/firebase/firebaseAdminConfig';

interface Comment {
    id: string;
    name: string;
    content: string;
    ownerUid: string;
}

const fetchComments = cache((commentsArr: Comment[]): Promise<Comment[]> => {
    const adminCommentsRef = adminDB.ref('/comments');

    return new Promise((resolve, reject) => {
        adminCommentsRef.on('value', (snapshot) => {
            const data = snapshot.val();
            for (let key in data) {
                commentsArr.unshift({
                    id: key,
                    name: data[key].name,
                    content: data[key].content,
                    ownerUid: data[key].ownerUid,
                });
            }

            resolve(commentsArr);
        }, (errorObject) => {
            reject({ message: errorObject.name });
        });
    });
});

export default fetchComments;
export type { Comment };