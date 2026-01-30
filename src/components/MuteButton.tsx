import { useState } from 'react';
import classNames from 'classnames';

import { RiVolumeMuteFill } from "react-icons/ri";
import { RiVolumeUpFill } from "react-icons/ri";

interface MuteButtonProps {
    onChange: () => void;
    className: string;
    fontSize: string;
}

export default function MuteButton({ className, onChange, fontSize }: MuteButtonProps) {
    const [isMuted, setIsMuted] = useState(false);

    const handleClick = () => {
        setIsMuted(currVal => !currVal);
        onChange();
    }

    const iconClassName = classNames(`relative left-[0.015em]`, {
        [`text-[${fontSize}]`]: fontSize,
    });

    return <div onClick={handleClick} className={className}>
        {isMuted ? <RiVolumeMuteFill className={iconClassName} /> : <RiVolumeUpFill className={iconClassName} />}
    </div>;
}