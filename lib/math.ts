export const calculateProfit = (money: number, apr: number, weeks: number) =>
	money * Math.pow(apr + 1, weeks) - money;
