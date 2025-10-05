/**
 * Tool definitions for the AI chat agent
 * Tools can either require human confirmation or execute automatically
 */
import { tool, type ToolSet } from "ai";
import { z } from "zod/v3";
import { getStockPrice, getStockNews } from "./services/stockService";

const retrieveStockPrice = tool({
  description: "get stock price for symbol",
  inputSchema: z.object({ symbol: z.string() }),
  execute: async ({ symbol }) => {
    console.log(`Retrieving stock price for ${symbol}`);
    return `The stock price for ${symbol} is ${await getStockPrice(symbol)}$`;
  }
});

const retrieveStockNews = tool({
  description: "get latest news for a stock symbol",
  inputSchema: z.object({ symbol: z.string() }),
  execute: async ({ symbol }) => {
    console.log(`Retrieving stock news for ${symbol}`);
    const latestNews = await getStockNews(symbol, 3);
    return `Latest news for ${symbol}: ${latestNews?.join('; ')}`;
  }
});

const getToolsList = tool({
  description: "get all available tools",
  inputSchema: z.object({ }),
  execute: () => {
    const toolsText = Object.entries(toolsList).map(([name]) => name).join(', ');
    return `The available tools are: ${toolsText}.`;
  }
});

/**
 * Export all available tools
 * These will be provided to the AI model to describe available capabilities
 */
const toolsList = {
  retrieveStockPrice,
  retrieveStockNews,
}
export const tools = {
  ...toolsList,
  getToolsList,
} satisfies ToolSet;

/**
 * Implementation of confirmation-required tools
 * This object contains the actual logic for tools that need human approval
 * Each function here corresponds to a tool above that doesn't have an execute function
 */
export const executions = {
};
