import * as timersPromise from 'timers/promises'
import {type Browser, connect, launch, type Page} from 'puppeteer'

import {kv} from "@vercel/kv";
import {VercelRequest, VercelResponse} from "@vercel/node";

type University = {
    city: string;
}
const getAllUniversities = async (): Promise<University[]> => {
    const res = await fetch(process.env.UNIVERSITIES_URL, {
        cache: "no-cache"
    })
    return await res.json()
}

const getBrowser = () => {
    if (process.env.NODE_ENV === 'production')
        return connect({browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BROWSERLESS_TOKEN}`})
    return launch({headless: true})
}

const cityToScrap = (city: string) =>
    `https://www.otodom.pl/pl/oferty/wynajem/pokoj/${city.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")}?distanceRadius=0&limit=36&priceMin=1&by=DEFAULT&direction=DESC&viewType=listing`


const pageHasCaptcha = (page: Page) => {
    return page.evaluate(() => document.getElementsByClassName("anchor-info").length || document.getElementsByClassName("rc-anchor-container").length)
}

const scrollIntoView = async (selector: string, page: Page) => {
    await page.evaluate((selector) => {
        document.querySelector(selector)?.scrollIntoView({block: 'end', inline: 'end'});
    }, selector)
}

const TIMEOUT_DURATION = 5000

const scrapper = async (pageUrl: string, browser: Browser) => {
    let sum = 0, n = 0
    let pageNumber = 0
    while (true) {
        const page = await browser.newPage()
        pageNumber += 1
        console.debug(`Visiting page ${pageNumber}`)
        await page.goto(`${pageUrl}&page=${pageNumber}`)
        console.debug('Loaded page')
        if (pageNumber == 1) {
            try {
                const button = await page.waitForSelector("#onetrust-accept-btn-handler")
                await button?.click()
                console.debug('Clicked cookie button')
            } catch (err) {
            }
        }
        console.debug('Scrolling')
        await scrollIntoView("button[data-cy='pagination.next-page']", page)
        try {
            await page.waitForNetworkIdle({idleTime: 2000, timeout: 5000})
        } catch (err) {
        }
        console.debug('Finished loading')
        if (await pageHasCaptcha(page)) {
            console.error("Page has captcha")
            break
        }
        const results = await page.evaluate(() => Array.from(document.querySelectorAll('article > div:nth-child(3) > span:first-child'), element => element.textContent));
        for (const priceText of results) {
            try {
                const matches = priceText?.match(/^\d+/)
                const price = matches && matches.length ? parseInt(matches[0]) : 0
                if (!isNaN(price) && price > 0) {
                    console.log(price)
                    sum += price
                    n += 1
                }
            } catch (err) {
                console.debug(err)
            }
        }
        await timersPromise.setTimeout(TIMEOUT_DURATION)
        try {
            const button = await page.waitForSelector('button[data-cy="pagination.next-page"]:not([disabled])', {
                timeout: 1000
            })
            if (!button) break
            await button.click()
        } catch (_) {
            console.debug('End of pagination')
            break;
        }
        await page.close()
    }
    return n > 0 ? sum / n : 0
}

const saveCityAverage = async (city: string, average: number) => {
    await kv.set(`average_price:rooms:${city}`, average)
}

const SKIP_LIST = ["Warszawa"]

const startScrapping = async () => {
    const universities = await getAllUniversities()
    const browser = await getBrowser()
    for (const university of universities) {
        if (SKIP_LIST.includes(university.city)) continue
        console.debug(`Scraping ${university.city}`)
        const pageUrl = cityToScrap(university.city)
        const average = await scrapper(pageUrl, browser)
        await saveCityAverage(university.city, average)
        console.debug('City scrap finished')
    }
    console.debug("Scrapping finished")
    await browser.close()
}

export default async function handler(_request: VercelRequest, response: VercelResponse) {
    await startScrapping()
    response.status(200).json({})
}
