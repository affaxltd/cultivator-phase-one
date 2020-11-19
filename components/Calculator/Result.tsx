import styled from "styled-components";
import { green, primaryColor } from "../../style/theme";
// @ts-ignore
import AnimatedNumber from "animated-number-react";
import { P } from "../Text";
import { Pool } from "../../interfaces/harvest";

const Results = styled.div`
	background: ${primaryColor}59;
	padding: 1.5rem;
	margin-top: 2rem;
	border-radius: 1rem;
	overflow-x: auto;
`;

const Title = styled(P)`
	margin-bottom: 1rem;
	font-size: 1.5rem;
`;

const Yield = styled(P)`
	color: ${green};
	font-size: 1.25rem;
	font-weight: 500;
`;

const Money = styled(P)`
	margin-top: -0.1rem;
	font-size: 3rem;
	display: flex;
`;

const Result = ({
	investment,
	pool,
	days,
}: {
	investment: string;
	pool: Pool;
	days: number;
}) => {
	const money = investment === "" ? 0 : parseFloat(investment);
	const earnedMoney = (parseFloat(pool.apr) / 365) * days * money;
	const percent = (earnedMoney / money) * 100 || 0;

	return (
		<Results>
			<Title>Estimated Profits:</Title>
			<Yield>+{percent.toFixed(2)}%</Yield>
			<Money>${earnedMoney.toFixed(2)}</Money>
		</Results>
	);
};

export default Result;
