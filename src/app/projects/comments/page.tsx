import { onValue } from 'firebase/database';
import { cache } from 'react';

import GeneralNav from "@/components/GeneralNav"
import AddCommentContainer from '@/components/CommentsPage/AddCommentContainer';
import CommentsShow from "@/components/CommentsPage/CommentsShow";
import { commentsRef } from "@/firebase/firebaseConfig";

interface Comment {
    id: string;
    name: string;
    content: string;
    ownerUid: string;
}

export default async function CommentsPage() {
    const comments = await fetchComments();

    return <>
        <GeneralNav title="Comments" />
        <main className="
            min-h-general-container-height bg-brand-light 
            px-[2.168rem] screen-4xs:px-4
        ">
            <div className="
                max-w-[43rem] 
                m-auto py-[3.975rem] 
            ">
                <AddCommentContainer />
                <CommentsShow comments={comments} />
            </div>
        </main>
    </>
}

const fetchComments = cache((): Promise<Comment[]> => {
    const comments: Comment[] = [];

    return new Promise((resolve, reject) => {
        onValue(commentsRef, (snapshot) => {
            const data = snapshot.val();
            for (let key in data) {
                comments.unshift({
                    id: key,
                    name: data[key].name,
                    content: data[key].content,
                    ownerUid: data[key].ownerUid,
                });
            }

            resolve(comments);
        });
    });
});