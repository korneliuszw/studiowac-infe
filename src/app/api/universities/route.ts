import {prisma} from "@/db";

export const getAllUniveritiesServer = () => {
    return prisma.university.findMany({
        select: {
            name: true
        }
    })
}