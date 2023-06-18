import {z} from "zod";
import {numericString} from "@/utils/zod";
import universities from "@/../university.json";
import {calculateSubjectPoints, getSubjectChance} from "@/utils/calculation";

export const schema = z.object({
    'maths_primary': numericString(z.number().max(100).min(30)),
    'maths_extended': numericString(z.number().max(100).min(0).optional().default(0)),
    'english_primary': numericString(z.number().max(100).min(30)),
    'english_extended': numericString(z.number().max(100).min(0).optional().default(0)),
    'polish_primary': numericString(z.number().max(100).min(30)),
    'polish_extended': numericString(z.number().max(100).min(0).optional().default(0)),
    'physics_extended': numericString(z.number().max(100).min(0).optional().default(0)),
    'computerScience_extended': numericString(z.number().max(100).min(0).optional().default(0)),
    'exams': z.object({
        // primary - theory, extended - practice
        'inf02_primary': numericString(z.number().max(100).min(50)),
        'inf02_extended': numericString(z.number().max(100).min(75)),
        'inf03_primary': numericString(z.number().max(100).min(50)),
        'inf03_extended': numericString(z.number().max(100).min(75)),
    }).optional()
})
export type CalculationRequestBody = z.infer<typeof schema>
type CalculationResultSubject = {
    subjectName: string;
    chance: "medium" | "high" | "unknown"
    lastKnownMinPoints: number;
    previousKnownMinPoints: number;
    points: number;
}
export type CalculationResultItem = {
    universityName: string;
    universityCity: string;
    universityId: number;
    subjects: CalculationResultSubject[]
}

type UniversitySubject = {
    id: number;
    name: string;
    facultyName: string;
    recrutationFormula: string;
    lastKnownMinPoints: number;
    previousKnownMinPoints: number;
}
type University = {
    id: number;
    name: string;
    city: string;
    facultyAddress: string;
    perspektywyRating: number;
    universitySubjects: UniversitySubject[]
}

export const calculateSever = async (rawBody: any): Promise<CalculationResultItem[]> => {
    const body = await schema.parseAsync(rawBody)
    return universities.reduce((universityReducer: CalculationResultItem[], university: University) => {
        const subjects = university.universitySubjects.reduce((reducer: CalculationResultSubject[], subject) => {
            const points = calculateSubjectPoints(subject.id, subject.recrutationFormula, body)
            const chance = getSubjectChance(points, subject.lastKnownMinPoints, subject.previousKnownMinPoints)
            if (chance) {
                reducer.push({
                    subjectName: subject.name,
                    chance,
                    lastKnownMinPoints: subject.lastKnownMinPoints,
                    previousKnownMinPoints: subject.previousKnownMinPoints,
                    points
                })
            }
            return reducer
        }, [])
        if (subjects.length) {
            universityReducer.push({
                universityName: university.name,
                universityCity: university.city,
                universityId: university.id,
                subjects
            })
        }
        return universityReducer
    }, [])
}