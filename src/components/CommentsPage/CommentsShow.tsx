import { TiPin } from "react-icons/ti";

interface Comment {
    id: string;
    name: string;
    content: string;
}

interface CommentsShowProps {
    comments: Comment[];
}

export default function CommentsShow({ comments }: CommentsShowProps) {
    const renderedComments = comments.map((comment) => {
        return <li key={comment.id} className="
            bg-brand-darkLight
            relative
            p-[1rem] mb-[0.75rem]
            text-[1.3rem]
            screen-4xs:text-[1rem]
        ">
            <p className="font-bold">{comment.name}</p>
            <p>{comment.content}</p>
            {
                comment.id === 'mySpecialComment' ?
                    <TiPin className="absolute top-[0.75em] right-[0.75em]" /> :
                    <></>
            }
        </li>
    });

    return <ul>
        {renderedComments}
    </ul>;
}