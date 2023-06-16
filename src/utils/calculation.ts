import {CalculationRequestBody} from "@/app/api/calculate/route";
import {evaluate, max} from "mathjs";

export const calculateSubjectPoints = (recrutationFormula: string, points: CalculationRequestBody) => {
    const value = evaluate(recrutationFormula, {
        ...points,
        ...points.exams,
        selection_extended: max(points.computerScience_extended, points.physics_extended),
        exams: points.exams ? 100 : 0
    })
    // evaluate returns ResultSet when formula has multiple lines
    // use the last one as the result
    if (value.entries) return value.entries[value.entries.length - 1]
    return value
}
export const getSubjectChance = (subjectPoints: number, lastKnownMinPoints: number, previousKnownMinPoints: number) => {
    if (subjectPoints >= lastKnownMinPoints) return "high"
    else if (subjectPoints >= previousKnownMinPoints) return "medium"
    return null
}