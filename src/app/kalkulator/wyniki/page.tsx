import {processCalculationSearchParams} from "@/utils/queryProcessor";
import {calculateSever} from "@/app/api/calculate/route";


export default async function Results({searchParams}: { searchParams: any }) {
    const params = processCalculationSearchParams(searchParams)
    const passed = await calculateSever(params)
    return (
        <main className={"container m-auto"}>
            {passed.map(university => {
                return (
                    <div key={university.universityName}
                         className={"collapse collapse-arrow overflow-visible relative w-full"}>
                        <input type={"checkbox"} className={"z-30"}/>
                        <div className={"collapse-title text-xl font-medium sticky z-20 top-0 bg-accent"}>
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
        </main>
    )

}