'use client';

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import GeneralNav from "@/components/GeneralNav";
import TextInput from '@/components/ToDoPage/TextInput/TextInput';
import Button from '@/components/Button';
import TaskShow from '@/components/ToDoPage/TaskShow';

import { Press_Start_2P } from 'next/font/google';
const pressStart2p = Press_Start_2P({ weight: "400", subsets: ["latin"] });

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
            px-3 pt-3 pb-9 flex flex-col gap-[1rem] justify-between
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

    return <div className="bg-brand-light min-h-svh w-full flex flex-col items-center">
        <GeneralNav title="To Do List" />
        <main className="max-w-container-width w-full pb-[8.09rem]">
            <div className="mt-9">
                <TextInput
                    labelText="Enter a new task"
                    onSubmit={handleFormSubmit}
                    value={term}
                    onChange={handleTermChange}
                    inputFieldWidth="max-w-[61.805%] w-full"
                />
                <h2 className={`
                    ${pressStart2p.className}
                    text-brand-dark
                    text-5xl
                    mt-16
                    mb-10
                    relative
                    left-[-0.381rem]
                `}>TO BE DONE:</h2>
                <ul>
                    {renderedTodoArr}
                </ul>
            </div>
        </main>
    </div>;
}