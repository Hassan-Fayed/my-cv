import GeneralNav from "@/components/GeneralNav"
import AddCommentContainer from '@/components/CommentsPage/AddCommentContainer';
import CommentsShow from "@/components/CommentsPage/CommentsShow";
import fetchComments from "@/utils/fetchComments";
import type { Comment } from "@/utils/fetchComments";

export default async function CommentsPage() {
    const comments: Comment[] = [];

    try {
        await fetchComments(comments);
    } catch (err) {
        if (err && typeof err === 'object' && 'message' in err)
            throw new Error('Somethin went wrong! Please, try again latter');
    }

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