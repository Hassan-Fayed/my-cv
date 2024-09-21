import { TiPin } from "react-icons/ti";

import CommentContent from './CommentContent';

interface Comment {
    id: string;
    name: string;
    content: string;
    ownerUid: string;
}

interface CommentsShowProps {
    comments: Comment[];
}

export default function CommentsShow({ comments }: CommentsShowProps) {
    const renderedComments = comments.map((comment) => {
        return <li key={comment.id} className="
            bg-brand-darkLight
            bg-brand-darkLight
            relative
            p-[1rem] mb-[0.75rem]
            text-[1.3rem]
            screen-4xs:text-[1rem]
        ">
            <p className="font-bold mb-[0.5rem]">{comment.name}</p>
            <CommentContent comment={comment} />
        </li>
    });

    return <ul>
        <li className="
            bg-brand-darkLight
            relative
            p-[1rem] mb-[0.75rem]
            text-[1.3rem]
            screen-4xs:text-[1rem]
        ">
            <p className="font-bold mb-[0.5rem]">Hassan Fayed</p>
            <p>{"Hello! I'm looking forward to reading your comments."}</p>
            <TiPin className="absolute top-[0.5em] right-[0.5em] text-brand-extraDark" />
        </li>
        {renderedComments}
    </ul>;
}