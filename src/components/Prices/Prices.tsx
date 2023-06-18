import {kv} from "@vercel/kv";

interface PricesProps {
    city: string;
}

export async function Prices({city}: PricesProps) {
    const averagePrice = await kv.get<number>(`average_price:rooms:${city}`)

    if (!averagePrice) {
        return null
    }
    return <div className="badge badge-secondary">Średnia cena najmu pokoju: {averagePrice.toFixed(2)}zł</div>
}