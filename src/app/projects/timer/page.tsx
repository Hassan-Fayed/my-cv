import GeneralNav from "@/components/GeneralNav";
import Timer from "@/components/TimerPage/Timer";

export default function CounterPage() {
    return <main className="w-full h-svh bg-brand-light flex flex-col items-center">
        <GeneralNav title="Timer" />
        <div className="
            h-general-container-height 
            w-projects-container-width 
            flex
            justify-center
            items-center
        ">
            <div className="relative top-[-2rem]">
                <Timer />
            </div>
        </div>
    </main>;
}