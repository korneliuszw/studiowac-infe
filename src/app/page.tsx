import {Hero} from "@/components/Hero/Hero";
import Link from "next/link";

export default function Home() {
    return (
        <main>
            <Hero title={"Matura za nami. Czas na studia informatyczne!"} description={`
                Chcesz studiować informatykę, ale nie wiesz, na jakie studia masz szanse sie dostać?
                Kalkulator szybko to sprawdzi!
            `}>
                <Link className={"btn btn-primary"} href={"/kalkulator"}>Sprawdź!</Link>
            </Hero>
        </main>
    )
}
