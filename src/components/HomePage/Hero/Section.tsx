import { Press_Start_2P } from "next/font/google";

import classNames from "classnames";

interface Content {
    title: string;
    subTitle: string;
    paragraph: string;
}

interface SectionProps {
    isOpaqueBG: boolean;
    title: string;
    content: Content[];
}

const pressStart2p = Press_Start_2P({ weight: '400', subsets: ['latin'] });

export default function Section({ title, content, isOpaqueBG }: SectionProps) {
    const h4ClassName = classNames(
        'font-bold text-[1.2rem] mb-4',
        {
            'text-brand-lightMedium': !isOpaqueBG,
            'text-brand-medium': isOpaqueBG,
        }
    );

    const renderedContent = content.map((el) => {
        return <div key={el.title}>
            <h3 className="font-bold text-[2.2rem] leading-tight">{el.title}</h3>
            <h4 className={h4ClassName}>
                {el.subTitle}
            </h4>
            {!!el.paragraph && <p className="text-[1.2rem]">{el.paragraph}</p>}
        </div>;
    });

    const sectionClassName = classNames(
        'w-full h-svh flex justify-center items-center text-brand-extraDark',
        {
            'text-brand-dark bg-brand-light': !isOpaqueBG,
            'text-brand-extraDark bg-brand-darkLight': isOpaqueBG,
        }
    );

    const beforeContainerClassName = classNames(
        'flex gap-x-8 before:content-[\'\'] before:w-2 before:block before:shrink-0',
        {
            'before:bg-brand-regular': !isOpaqueBG,
            'before:bg-brand-darkRegular': isOpaqueBG,
        }
    );

    return <section aria-labelledby="education-title" className={sectionClassName}>
        <div className="
            max-w-container-width 
            flex 
            gap-y-12 
            flex-col 
            justify-center 
            relative 
            top-[1.15rem]
        ">
            <h2 id="education-title" className={`
                    ${pressStart2p.className}
                    uppercase
                    text-[3.6rem]
                `}>{title}</h2>
            <div className={beforeContainerClassName}>
                <div className="flex flex-col gap-y-12">{renderedContent}</div>
            </div>
        </div>
    </section>
}