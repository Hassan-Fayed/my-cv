import { Press_Start_2P } from "next/font/google";

interface HPBarPropsType {
    total: number;
    current: number;
}

const pressStart2p = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export default function HPBarPropsType({ total, current }: HPBarPropsType) {
    const percentage = current / total * 100;

    let remainingLifeWidth: string = getLifeBarWidth(percentage);

    return <div className={`
        text-[0.75rem]
        w-full 
        ${pressStart2p.className}
        flex
        items-center
    `}>
        <span>HP:</span>
        <div className="
            h-[1.1em]
            border-box 
            border
            border-brand-dark
            grow
        ">
            <div className={`
                h-full
                ${remainingLifeWidth}
                bg-brand-regular
                transition-all
            `}></div>
        </div>
    </div>;
}

function getLifeBarWidth(percentage: number) {
    let remainingLifeWidth: string = "w-[100%]";

    if (percentage > 95)
        remainingLifeWidth = "w-[100%]";
    else if (percentage > 90)
        remainingLifeWidth = "w-[95%]";
    else if (percentage > 85)
        remainingLifeWidth = "w-[90%]";
    else if (percentage > 80)
        remainingLifeWidth = "w-[85%]";
    else if (percentage > 75)
        remainingLifeWidth = "w-[80%]";
    else if (percentage > 70)
        remainingLifeWidth = "w-[75%]";
    else if (percentage > 65)
        remainingLifeWidth = "w-[70%]";
    else if (percentage > 60)
        remainingLifeWidth = "w-[65%]";
    else if (percentage > 55)
        remainingLifeWidth = "w-[60%]";
    else if (percentage > 50)
        remainingLifeWidth = "w-[55%]";
    else if (percentage > 45)
        remainingLifeWidth = "w-[50%]";
    else if (percentage > 40)
        remainingLifeWidth = "w-[45%]";
    else if (percentage > 35)
        remainingLifeWidth = "w-[40%]";
    else if (percentage > 30)
        remainingLifeWidth = "w-[35%]";
    else if (percentage > 25)
        remainingLifeWidth = "w-[30%]";
    else if (percentage > 20)
        remainingLifeWidth = "w-[25%]";
    else if (percentage > 15)
        remainingLifeWidth = "w-[20%]";
    else if (percentage > 10)
        remainingLifeWidth = "w-[15%]";
    else if (percentage > 5)
        remainingLifeWidth = "w-[10%]";
    else if (percentage > 0)
        remainingLifeWidth = "w-[2%]";
    else if (percentage <= 0)
        remainingLifeWidth = "w-[0%]";

    return remainingLifeWidth;
}