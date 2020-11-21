import { CalculatorState, CalculatorContext } from "../../state/calculator";
import React, { PropsWithChildren, useState } from "react";

const CalculatorProvider = ({ children }: PropsWithChildren<{}>) => {
	const [state, setState] = useState<CalculatorState>({
		investment: "",
		pool: 0,
		weeks: 26,
		currency: "usd/cad",
	});

	return (
		<CalculatorContext.Provider
			value={{
				...state,
				setState,
			}}
		>
			{children}
		</CalculatorContext.Provider>
	);
};

export default CalculatorProvider;
