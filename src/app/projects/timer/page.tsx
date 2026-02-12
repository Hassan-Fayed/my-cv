import GeneralNav from "@/components/GeneralNav";
import Timer from "@/components/TimerPage/Timer";

export default function CounterPage() {
    return <>
        <GeneralNav title="Timer" />
        <main className="
            bg-brand-light
            min-h-general-container-height 
            flex justify-center items-center
            text-[1rem]
            max-screen-2xs:text-[0.84rem]
            max-screen-3xs:text-[0.76rem]
            max-screen-4xs:text-[0.64rem]
        ">
            <Timer className="w-max leading-none" />
        </main>
    </>;
}