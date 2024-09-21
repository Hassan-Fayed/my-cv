import classNames from "classnames";
import { IoCloseSharp } from "react-icons/io5";
import type { Dispatch, SetStateAction } from "react";

interface FormMessageProps {
    success?: boolean;
    danger?: boolean;
    message: string;
    className?: string;
    setIsShowMessage: Dispatch<SetStateAction<boolean>>
}

export default function FormMessage({
    success = false,
    danger = false,
    message,
    className = '',
    setIsShowMessage,
}: FormMessageProps) {
    const containerClassName = classNames(
        'text-brand-extraLight text-[1.3rem] p-[1.75rem] font-bold',
        'flex justify-center items-center',
        'screen-4xs:text-[1rem]',
        'relative',
        {
            'bg-brand-darkRegular': success,
            'bg-brand-accent': danger,
            [className]: !!className,
        }
    );

    const handleClick = () => {
        setIsShowMessage(false);
    };

    return <div className={containerClassName}>
        <button onClick={handleClick} className="group">
            <IoCloseSharp className="
                absolute top-[5px] right-[5px] 
                text-brand-extraLight text-[1.75rem] stroke-[0.75rem]
                group-hover:rotate-90 transition-transform ease-out duration-100 
            "/>
        </button>
        {message}
    </div>;
}