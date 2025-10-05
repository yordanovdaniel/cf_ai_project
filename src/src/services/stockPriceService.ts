import axios from 'axios';

const API_KEY = process.env.ALPHAVANTAGE_API_KEY!;
const BASE_URL = process.env.ALPHAVANTAGE_BASE_URL!;

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