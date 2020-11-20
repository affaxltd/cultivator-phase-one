import CalculatorProvider from "../Providers/CalculatorProvider";
import styled from "styled-components";
import Investment from "./Investment";
import Result from "./Result";
import Card from "../Base/Card";
import Time from "./Time";

const Section = styled.section`
	max-width: 500px;
	margin: 0 auto;
`;

const Calculator = () => (
	<CalculatorProvider>
		<Section id="calculator">
			<Card>
				<Investment />
				<Time />
				<Result />
			</Card>
		</Section>
	</CalculatorProvider>
);

export default Calculator;
