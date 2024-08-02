import Link from "next/link";
import classNames from "classnames";

interface IconLinkProps {
    children: JSX.Element;
    color: string;
    hoverColor: string;
    hoverBackgroundColor: string;
    hoverContainerDimensions: string;
    to: string;
    fontSize: string;
}

export default function IconLink({
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
        hoverBackgroundColor,
        hoverContainerDimensions,
        'tratransition-colors'
    );

    const LinkClassName = classNames(
        color,
        fontSize,
        hoverColor,
        'transition-colors'
    );

    return <div className={divClassName}>
        <Link target="_blank" className={LinkClassName} href={to}>{children}</Link>
    </div>;
}