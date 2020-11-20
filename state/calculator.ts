import { createContext } from "react";
import { CompleteState } from ".";

export interface CalculatorState {
	investment: string;
	pool: number;
	weeks: number;
}

type CompleteCalculatorState = CompleteState<CalculatorState>;

export const CalculatorContext = createContext<CompleteCalculatorState>({
	investment: "",
	pool: 0,
	weeks: 26,
	setState: () => {},
});
