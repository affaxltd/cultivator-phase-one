export const calculateProfit = (money: number, apr: number, weeks: number) =>
	money * Math.pow(apr + 1, weeks) - money;

export const aprToApy = (apr: number) =>
	Math.pow((apr / 365) * 7 + 1, 365 / 7) - 1;
