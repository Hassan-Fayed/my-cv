import { onValue } from 'firebase/database';

import GeneralNav from "@/components/GeneralNav"
import AddComment from "@/components/CommentsPage/AddComment"
import CommentsShow from "@/components/CommentsPage/CommentsShow";
import { getCommentsFirebaseRef } from "@/utils/firebaseConfig";

interface Comment {
    id: string;
    name: string;
    content: string;
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
                <AddComment className="mb-[2.3rem]" />
                <CommentsShow comments={comments} />
            </div>
        </main>
    </>
}

function fetchComments(): Promise<Comment[]> {
    const commentsRef = getCommentsFirebaseRef();
    let comments: Comment[] = [];

    return new Promise((resolve, reject) => {
        onValue(commentsRef, (snapshot) => {
            const data = snapshot.val();
            for (let key in data) {
                comments.unshift({
                    id: key,
                    name: data[key].name,
                    content: data[key].content,
                });
            }

            comments.unshift({
                id: 'mySpecialComment',
                name: 'Hassan',
                content: 'Hello! I\'m looking forward to reading your comments.',
            });

            resolve(comments);
        });
    });
}