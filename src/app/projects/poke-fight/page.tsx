import GeneralNav from "@/components/GeneralNav";
import PokeShow from "@/components/PokeFight/PokeShow";

import { PokemonProvider } from "@/context/pokemonContext";

import { pressStart2pFont } from '@/utils/fonts';

export default async function PokeFightPage() {
    return <PokemonProvider>
        <GeneralNav title="PokéFight" />
        <main className="
            min-h-general-container-height bg-brand-light
            px-[2.168rem]
            max-screen-xs:px-[1rem]
        ">
            <div className="
                max-w-container-width 
                pt-[3rem]
                mx-auto
                flex justify-between
                text-[1rem]
                max-screen-md:text-[0.9rem]
                max-screen-s:text-[0.8rem]
                max-screen-s:text-[0.7rem]
                max-screen-xs:text-[0.6rem]
            ">
                <PokeShow position="left" className="
                    w-[30%]
                    max-screen-s:w-[35%]
                    max-screen-ss:w-[40%]
                    max-screen-4xs:w-[45%]
                " />
                <div className={`
                    ${pressStart2pFont.className}  
                    text-[max(1.875em,1rem)]
                    text-brand-medium
                    flex
                    justify-center
                    items-center
                    w-[10%]
                `}>
                    <span className="relative top-[1.75em] screen-2xs:hidden">VS</span>
                </div>
                <PokeShow position="right" className="
                    w-[30%]
                    max-screen-s:w-[35%]
                    max-screen-ss:w-[40%]
                    max-screen-4xs:w-[45%]
                " />
            </div>
        </main>
    </PokemonProvider>;
}