import { Currency } from "../types/money";

export const currencies = new Map<Currency, string>([
	["usd/cad", "$"],
	["eur", "€"],
	["yen", "¥"],
	["gbp", "£"],
	["eth", "💎"],
	["farm", "🚜"],
]);

export const calculateProfit = (money: number, apr: number, weeks: number) =>
	money * Math.pow(apr + 1, weeks) - money;

export const aprToApy = (apr: number) =>
	Math.pow(1 + apr / (365 / 7), 365 / 7) - 1;

export const apyToApr = (apy: number) =>
	(365 * (Math.pow(apy + 1, 7 / 365) - 1)) / 7;
