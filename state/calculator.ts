import { createContext } from "react";
import { CompleteState } from ".";
import { Currency } from "../types/money";

export interface CalculatorState {
	investment: string;
	pool: number;
	weeks: number;
	currency: Currency;
}

type CompleteCalculatorState = CompleteState<CalculatorState>;

export const CalculatorContext = createContext<CompleteCalculatorState>({
	investment: "",
	pool: 0,
	weeks: 26,
	currency: "usd/cad",
	setState: () => {},
});
