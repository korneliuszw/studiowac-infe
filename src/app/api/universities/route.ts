import {NextResponse} from "next/server";
import {getAllUniveritiesServer} from "@/app/apiFunctions/getUniversities";

export async function GET() {
    return NextResponse.json(await getAllUniveritiesServer())
}