import Link from "next/link";
import classNames from "classnames";

interface IconLinkProps {
    isLinkingOutside: boolean
    children: JSX.Element;
    color: string;
    hoverColor: string;
    hoverBackgroundColor: string;
    hoverContainerDimensions: string;
    to: string;
    fontSize: string;
}

export default function IconLink({
    isLinkingOutside,
    children,
    color,
    hoverColor,
    hoverBackgroundColor,
    hoverContainerDimensions,
    to,
    fontSize
}: IconLinkProps) {
    const divClassName = classNames(
        'group',
        'rounded-[50%]',
        'flex',
        'justify-center',
        'items-center',
        'tratransition-colors', {
        [hoverBackgroundColor]: hoverBackgroundColor,
        [hoverContainerDimensions]: hoverContainerDimensions,
    }
    );

    const LinkClassName = classNames(
        color,
        hoverColor,
        fontSize,
        'transition-colors',
    );

    return <div className={divClassName}>
        {isLinkingOutside && <Link target="_blank" className={LinkClassName} href={to}>{children}</Link>}
        {!isLinkingOutside && <Link className={LinkClassName} href={to}>{children}</Link>}
    </div>;
}