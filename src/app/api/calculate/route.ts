import {NextRequest, NextResponse} from "next/server";
import {calculateSever} from "@/app/apiFunctions/calculate";


export async function GET(req: NextRequest) {
    return NextResponse.json(await calculateSever(await req.json()))
}