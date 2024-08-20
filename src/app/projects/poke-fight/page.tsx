import GeneralNav from "@/components/GeneralNav";
import PokeShow from "@/components/PokeFight/PokeShow";

import { PokemonProvider } from "@/context/pokemonContext";

import { Press_Start_2P } from "next/font/google";

const pressStart2p = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export default function PokeFightPage() {
    return <PokemonProvider>
        <div className="w-full h-svh bg-brand-light">
            <GeneralNav title="PokéFight" />
            <main className="
            h-general-container-height 
            max-w-container-width 
            ml-auto
            mr-auto
            flex
            overflow-y-clip
            pt-[3rem]
            box-border
        ">
                <div className="w-[45%] flex justify-start">
                    <PokeShow position="left" />
                </div>
                <div className={`
                    ${pressStart2p.className}  
                    text-3xl 
                    text-brand-medium
                    flex
                    justify-center
                    items-center
                    w-[10%]
                `}>
                    <span className="relative top-[2.5rem]">VS</span>
                </div>
                <div className="w-[45%] flex justify-end">
                    <PokeShow position="right" />
                </div>
            </main>
        </div>
    </PokemonProvider>;
}