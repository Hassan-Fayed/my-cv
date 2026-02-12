'use client';

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import GeneralNav from "@/components/GeneralNav";
import TextInput from '@/components/TextInput/TextInput';
import TaskShow from '@/components/ToDoPage/TaskShow';
import { pressStart2pFont } from '@/utils/fonts';

interface ToDo {
    id: string;
    task: string;
}

type ToDoArr = ToDo[];

export default function ToDoPage() {
    const [term, setTerm] = useState('');
    const [toDoArr, setToDoArr] = useState<ToDoArr>([]);

    const handleTermChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTerm(e.target.value);
    };

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setToDoArr((currToDoArr) => {
            return [
                ...currToDoArr,
                { id: (Math.random() * 9999999999).toString(), task: term },
            ]
        });
        setTerm('');
    }

    const handleDeleteClick = (id: string) => {
        const newToDoArr = toDoArr.filter((toDo) => {
            return toDo.id !== id;
        });

        setToDoArr(newToDoArr);
    };

    const handleEditToDo = (id: string, newTask: string) => {
        const newToDoArr = toDoArr.map((toDo) => {
            if (toDo.id !== id) return toDo;
            return { id, task: newTask }
        });

        setToDoArr(newToDoArr);
    };

    const renderedTodoArr = toDoArr.map((toDo, idx) => {
        return <li key={toDo.id} className={`
            p-[1.5rem] flex flex-col gap-[1rem] justify-between
            ${idx % 2 === 0 ? 'bg-brand-darkLight' : 'bg-transparent'}
        `}>
            <TaskShow
                id={toDo.id}
                task={toDo.task}
                onDeleteClick={handleDeleteClick}
                onEditToDo={handleEditToDo}
                idx={idx}
            />
        </li>;
    })

    return <div className="bg-brand-light min-h-svh">
        <GeneralNav title="To Do List" />
        <main className="
            text-[1rem]
            max-w-container-width w-full mx-auto
            pt-9 pb-[4.5rem] px-[2.168rem]
            max-screen-xs:text-[0.9rem]
            max-screen-2xs:text-[0.8rem]
            max-screen-3xs:text-[0.7rem]
        ">
            <TextInput
                labelText="Enter a new task"
                onSubmit={handleFormSubmit}
                value={term}
                onChange={handleTermChange}
                inputFieldWidth="
                    w-[61.805%]
                    max-screen-xs:w-full
                "
                inputUniqueId="task-input"
                parentFontSize="
                    text-[1rem] 
                    max-screen-xs:text-[0.8rem]
                "
            />
            <h2 className={`
                ${pressStart2pFont.className}
                text-brand-dark
                text-[1.618em]
                mt-16 mb-10
            `}>
                TO BE DONE:
            </h2>
            <ul className="
                text-[1rem]
                max-screen-xs:text-[0.8rem]
            ">
                {renderedTodoArr}
            </ul>
        </main>
    </div>;
}