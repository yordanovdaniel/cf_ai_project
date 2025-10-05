import axios from 'axios';

const API_KEY = process.env.ALPHAVANTAGE_API_KEY!;
const BASE_URL = process.env.ALPHAVANTAGE_BASE_URL!;

// get current stock price
export async function getStockPrice(symbol: string): Promise<number | null> {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                function: 'GLOBAL_QUOTE',
                symbol,
                apikey: API_KEY,
            },
        });

        const price = response.data?.['Global Quote']?.['05. price'];
        return price ? parseFloat(price) : null;
    } catch (error) {
        console.error('Error fetching stock price:', error);
        return null;
    }
}

// get latest stock news
export async function getStockNews(symbol: string, count: Number): Promise<string[] | null> {
    try {
        // Example implementation: fetch news using axios (replace with actual API if needed)
        const response = await axios.get(BASE_URL, {
            params: {
                function: 'NEWS_SENTIMENT',
                tickers: symbol,
                apikey: API_KEY,
                sort: "RELEVANCE"
            },
        });

        // Example: parse news headlines from response (adjust according to actual API response)
        const news = response.data?.feed?.slice(0, Number(count))?.map((item: any) => item.title) ?? null;
        return news;
    } catch (error) {
        console.error('Error fetching stock news:', error);
        return null;
    }
}