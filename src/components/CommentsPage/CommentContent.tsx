"use client";

import { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { IoPencilSharp } from "react-icons/io5";
import { IoCheckmarkDoneSharp } from "react-icons/io5";


import { deleteComment, editComment, getCurrUserUid } from "@/actions";
import setAntiCSRFCookie from "@/utils/setAntiCSRFCookie";

interface Comment {
    id: string;
    name: string;
    content: string;
    ownerUid: string;
}

interface CommentContentProps {
    comment: Comment;
}

export default function CommentContent({ comment }: CommentContentProps) {
    const [currUserUid, setCurrUserUid] = useState<string | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    // instead of useFormState
    const [editCommentFormState, setEditCommentFormState] = useState({
        message: '',
    });
    const [deleteCommentFormState, setDeleteCommentFormState] = useState({
        message: '',
    });


    useEffect(() => {
        (async () => {
            setCurrUserUid(await getCurrUserUid());
        })();
    }, []);

    const handleEditClick = () => {
        setIsEdit(true);
    };

    const editCommentClientAction = async (formData: FormData) => {
        setIsEdit(false);
        const antiCSRFToken = await setAntiCSRFCookie();
        const messageObj = await editComment(
            comment.id,
            comment.ownerUid,
            antiCSRFToken,
            editCommentFormState,
            formData
        );
        setEditCommentFormState(messageObj);
    };

    const deleteCommentClientAction = async (formData: FormData) => {
        const antiCSRFToken = await setAntiCSRFCookie();
        const messageObj = await deleteComment(
            comment.id,
            comment.ownerUid,
            antiCSRFToken,
            editCommentFormState,
            formData,
        );
        setDeleteCommentFormState(messageObj);
    };

    return <>
        {!isEdit && !editCommentFormState.message ?
            <>
                <p>{comment.content}</p>
                {deleteCommentFormState.message &&
                    <p className="
                        text-[1rem] font-bold text-brand-extraLight 
                        bg-brand-accent p-[0.5rem] mt-[0.75rem]
                    ">
                        {deleteCommentFormState.message}
                    </p>
                }
                <div className="
                    flex items-start gap-[0.5rem] 
                    absolute top-[0.5rem] right-[0.5rem]
                ">
                    {currUserUid === comment.ownerUid && <>
                        <button
                            onClick={handleEditClick}
                            className="text-brand-lightMedium hover:text-brand-extraDark transition-colors">
                            <IoPencilSharp />
                        </button>
                        <form
                            action={deleteCommentClientAction}
                            className="leading-[0]"
                        >
                            <button
                                type="submit"
                                className="text-brand-lightMedium hover:text-brand-accent transition-colors"
                            >
                                <IoCloseSharp className="stroke-[1rem]" />
                            </button>
                        </form>
                    </>}
                </div>
            </> :
            <form action={editCommentClientAction}>
                <button type="submit" className="group">
                    <IoCheckmarkDoneSharp
                        className="
                            absolute top-[0.5rem] right-[0.5rem] 
                            text-brand-medium group-hover:text-brand-extraDark
                        "
                    />
                </button>
                <textarea
                    name="newContent"
                    required
                    defaultValue={comment.content}
                    rows={2}
                    className="
                        bg-[#FFF] text-brand-dark
                        resize-none px-[0.5rem] w-full 
                        focus:outline-none focus:outline-brand-lightMedium
                        focus:outline-offset-[-1px] focus:rounded-none
                    ">
                </textarea>
                {editCommentFormState.message && <p className="text-[1rem] font-bold text-brand-extraLight bg-brand-accent p-[0.5rem]">
                    {editCommentFormState.message}
                </p>}
            </form>
        }
    </>
}