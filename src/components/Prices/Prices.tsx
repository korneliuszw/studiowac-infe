import {kv} from "@vercel/kv";

interface PricesProps {
    city: string;
}

export async function Prices({city}: PricesProps) {
    const averagePrice = await kv.get<number>(`average_price:rooms:${city}`)
    const lastScrap = await kv.get<string>('last_scrapping')
    const message = lastScrap ? `Ostatnie sprawdzanie: ${new Intl.DateTimeFormat('pl').format(new Date(lastScrap))}` : ""
    if (!averagePrice) {
        return null
    }
    return <div className={"tooltip tooltip-bottom"} data-tip={message + ". Pobrano z Otodom"}>
        <div className="badge badge-secondary">
            Średnia cena najmu pokoju: {averagePrice.toFixed(2)}zł
        </div>
    </div>
}