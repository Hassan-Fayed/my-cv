'use client';

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import Button from "../Button";

interface ToDoShowPropsType {
    id: string;
    task: string;
    onDeleteClick: (id: string) => void;
    onEditToDo: (id: string, newTask: string) => void;
    idx?: number;
}

export default function TaskShow({ id, task, onDeleteClick, onEditToDo: handleEditToDo, idx = 1 }: ToDoShowPropsType) {
    const [isEdit, setIsEdit] = useState(false);
    const [term, setTerm] = useState(task);

    const handleTermChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTerm(e.target.value);
    }

    const handleEditClick = () => {
        setIsEdit(true);
    }

    const handleEditFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        handleEditToDo(id, term);

        setIsEdit(false);
    }

    return <>
        {
            !isEdit ?
                <>
                    <span className={`
                        text-2xl 
                        relative
                        flex
                        items-start
                        gap-3
                        before:content-['']
                        ${idx % 2 === 0 ? 'before:bg-brand-darkRegular' : 'before:bg-brand-regular'}
                        before:w-2
                        before:h-2
                        before:relative
                        before:top-[1.06rem]
                        before:shrink-0
                    `}>{task}</span>
                    <span className="inline-flex gap-2 self-end shrink-0">
                        <Button onClick={handleEditClick} fontSize="text-xs" regular
                            parentBackgroundColor={
                                idx % 2 === 0 ? 'bg-brand-darkLight' : 'bg-brand-light'
                            }
                        >
                            Edit
                        </Button>
                        <Button onClick={() => onDeleteClick(id)} fontSize="text-xs" danger
                            parentBackgroundColor={
                                idx % 2 === 0 ? 'bg-brand-darkLight' : 'bg-brand-light'
                            }
                        >
                            Done
                        </Button>
                    </span>
                </> :
                <form onSubmit={handleEditFormSubmit} className="
                    before:content-['']
                    before:bg-brand-regular
                    before:w-2
                    before:h-2
                    before:relative
                    before:top-[1.06rem]
                    before:shrink-0
                    flex
                    gap-3
                ">
                    <input autoFocus onChange={handleTermChange} value={term} type="text" className="
                        text-2xl
                        pl-2 
                        text-brand-dark
                        border
                        border-brand-regular
                        focus:outline-none
                        focus:outline-brand-lightMedium
                        focus:outline-offset-[-1px]
                        focus:rounded-none
                    "/>
                </form>
        }
    </>;
}