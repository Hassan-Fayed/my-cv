interface SmallRoundButtonProps {
    onClick: () => void;
    disabled: boolean;
    id: string;
}

export default function SmallRoundButton({ onClick, disabled, id }: SmallRoundButtonProps) {
    return <button
        onClick={onClick}
        disabled={disabled}
        type="button"
        id={id}
        className="relative group"
    >
        <div className={`
            w-[1rem] h-[1rem] rounded-[50%]
            bg-brand-regular 
            border-[0.1rem] border-brand-dark box-border
            absolute bottom-[0.5rem] left-[0] z-20  
            group-hover:translate-y-[0.2rem]  
            group-active:translate-y-[0.5rem]
            ${disabled && `
                    !bg-brand-neutral 
                    hover:bg-brand-neutral 
                    border-brand-lightMedium 
                    translate-y-[0.5rem]
                    group-hover:translate-y-[0.5rem]
                `
            } 
            transition-transform duration-[0.07s] ease-out 
            group-active:duration-[0.01s] group-active:ease-in                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
        `}></div>
        <div className={`
            w-[1rem] h-[0.5rem] bg-brand-dark
            absolute bottom-[0.5rem] z-10
            group-hover:h-[0.3rem]
            group-active:h-[0rem]
            ${disabled && 'h-[0rem] group-hover:h-[0rem]'}
            transition-[height] duration-[0.07s] ease-out
            group-active:duration-[0.01s] group-active:ease-in
        `}></div>
        <div className={`
            w-[1rem] h-[1rem]
            bg-brand-dark rounded-full
            relative z-0
            ${disabled && 'bg-brand-lightMedium'}
        `}></div>
    </button>;
}