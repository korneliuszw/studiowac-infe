import {processCalculationSearchParams} from "@/utils/queryProcessor";
import {calculateSever} from "@/app/api/calculate/route";


export default async function Results({searchParams}: { searchParams: any }) {
    const params = processCalculationSearchParams(searchParams)
    console.log(params)
    const passed = await calculateSever(params)
    console.log(passed)
}