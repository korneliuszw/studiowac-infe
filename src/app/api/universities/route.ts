import {NextResponse} from "next/server";
import {getAllUniveritiesServer} from "@/app/apiFunctions/getUniversities";

export default async function GET() {
    return NextResponse.json(await getAllUniveritiesServer())
}