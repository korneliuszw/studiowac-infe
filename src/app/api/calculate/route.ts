import {NextRequest, NextResponse} from "next/server";
import {z} from "zod";
import {numericString} from "@/utils/zod";
import {prisma} from "@/db";
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
    }).optional().default({
        inf02_extended: 0,
        inf02_primary: 0,
        inf03_extended: 0,
        inf03_primary: 0
    })
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

export const calculateSever = async (rawBody: any): Promise<CalculationResultItem[]> => {
    const body = await schema.parseAsync(rawBody)
    console.log(body)
    const universities = await prisma.university.findMany({
        select: {
            name: true,
            id: true,
            city: true,
            universitySubject: {
                select: {
                    id: true,
                    name: true,
                    recrutationFormula: true,
                    lastKnownMinPoints: true,
                    previousKnownMinPoints: true
                }
            }
        }
    })
    return universities.reduce((universityReducer: CalculationResultItem[], university) => {
        const subjects = university.universitySubject.reduce((reducer: CalculationResultSubject[], subject) => {
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

export default async function GET(req: NextRequest) {
    return NextResponse.json(await calculateSever(await req.json()))
}