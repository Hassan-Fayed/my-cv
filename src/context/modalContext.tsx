'use client';

import { createContext, useContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

interface ModalContextValueType {
    isShowModal: boolean;
    setIsShowModal: Dispatch<SetStateAction<boolean>>
}

interface ModalProviderPropsType {
    children: React.ReactNode;
}

const ModalContext = createContext<ModalContextValueType | null>(null);

function ModalProvider({ children }: ModalProviderPropsType) {
    const [isShowModal, setIsShowModal] = useState(false);

    const value = { isShowModal, setIsShowModal };

    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

function useModalContext() {
    const modalContext = useContext(ModalContext);

    if (!modalContext)
        throw new Error('useModalContext must be used inside ModalProvider');

    return modalContext;
}

export { ModalProvider, useModalContext };