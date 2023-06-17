import {processCalculationSearchParams} from "@/utils/queryProcessor";
import {calculateSever} from "@/app/api/calculate/route";
import {getAllUniveritiesServer} from "@/app/api/universities/route";


export default async function Results({searchParams}: { searchParams: any }) {
    const params = processCalculationSearchParams(searchParams)
    const [passed, universities] = await Promise.all([calculateSever(params), getAllUniveritiesServer()])
    return (
        <main className={"container m-auto"}>
            {passed.map(university => {
                return (
                    <div key={university.universityName}
                         className={"collapse collapse-arrow overflow-visible relative w-full"}>
                        <input type={"checkbox"} className={"z-30"}/>
                        <div className={"collapse-title text-xl font-medium sticky z-20 top-0 bg-base-300"}>
                            {university.universityName}
                        </div>
                        <div className={"collapse-content overflow-x-auto"}>
                            <table className={"table table-zebra w-full mt-2"}>
                                <thead>
                                <tr>
                                    <th style={{position: "static"}}>Kierunek</th>
                                    <th>Szansa</th>
                                    <th>Twój wynik</th>
                                    <th>Próg 2022</th>
                                    <th>Próg 2021</th>
                                </tr>
                                </thead>
                                <tbody>
                                {university.subjects.map(subject => {
                                    return (
                                        <tr key={subject.subjectName}>
                                            <td>{subject.subjectName}</td>
                                            <td>{subject.chance === "unknown" ? "Nieznana" : subject.chance === "high" ? "Wysoka" : "Średnia"}</td>
                                            <td>{subject.points}</td>
                                            <td>{subject.lastKnownMinPoints || "-"}</td>
                                            <td>{subject.previousKnownMinPoints || "-"}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            })}
            <ol className={"list-disc text-sm"}>
                Aktualnie znane uniwersytety:
                {universities.map(university => <li>{university.name}</li>)}
            </ol>
            <div className={"text-end ml-auto max-w-prose whitespace-pre-wrap text-sm font-light"}>
                Brane pod uwagę są dwa poprzednie znane progi punktowe. Brak uczelni lub kierunku na liście oznacza, że
                wynik
                mieści się
                poniżej tych progów. <br/>Uczelnie posortowane są według pozycji w rankingu perspektyw
            </div>
        </main>
    )

}