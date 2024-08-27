import { Press_Start_2P } from "next/font/google";

import classNames from "classnames";

interface Content {
    subTitle: string;
    details: string;
    paragraph: string;
}

interface SectionProps {
    isOpaqueBG: boolean;
    title: JSX.Element;
    content: Content[];
    paddingY: string;
}

const pressStart2p = Press_Start_2P({ weight: '400', subsets: ['latin'] });

export default function Section({ title, content, isOpaqueBG, paddingY }: SectionProps) {
    const h4ClassName = classNames(
        'font-bold text-[max(1.2em,1rem)] mb-[1em]',
        {
            'text-brand-lightMedium': !isOpaqueBG,
            'text-brand-medium': isOpaqueBG,
        }
    );

    const renderedContent = content.map((el) => {
        return <div key={el.subTitle}>
            <h3 className="font-bold text-[max(2.2em,1.5rem)] max-w-[45ch] leading-tight">{el.subTitle}</h3>
            <h4 className={h4ClassName}>{el.details}</h4>
            {!!el.paragraph && <p className="text-[max(1.2em,1rem)] max-w-[75ch]">{el.paragraph}</p>}
        </div>;
    });

    const sectionClassName = classNames(
        'text-[1rem] text-brand-extraDark px-11',
        'screen-2xs:px-6',
        'screen-slg:text-[0.95rem]',
        'screen-md:text-[0.8rem]',
        'screen-smd:text-[0.7rem]',
        'screen-2xs:text-[0.5rem]',
        'screen-3xs:text-[0.45rem]',
        {
            'text-brand-dark bg-brand-light': !isOpaqueBG,
            'text-brand-extraDark bg-brand-darkLight': isOpaqueBG,
        }
    );

    const beforeContainerClassName = classNames(
        'flex gap-x-[2em] before:content-[\'\'] before:w-2 before:block before:shrink-0',
        {
            'before:bg-brand-regular': !isOpaqueBG,
            'before:bg-brand-darkRegular': isOpaqueBG,
        }
    );

    return <section aria-labelledby="education-title" className={sectionClassName}>
        <div className={`
            ${paddingY}
            max-w-container-width 
            mx-auto
            flex
            flex-col 
            gap-y-[3em] 
            relative
        `}>
            <h2 id="education-title" className={`
                    ${pressStart2p.className}
                    uppercase
                    text-[3.6em]
            `}>
                {title}
            </h2>
            <div className={beforeContainerClassName}>
                <div className="flex flex-col gap-y-[3em]">{renderedContent}</div>
            </div>
        </div>
    </section>
}