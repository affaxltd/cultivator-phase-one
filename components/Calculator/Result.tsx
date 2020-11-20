import styled from "styled-components";
import { green, mainBgColor, primaryColor, textColor } from "../../style/theme";
import { P } from "../Text";
import { Pool } from "../../interfaces/harvest";
import { useState } from "react";
import { calculateProfit } from "../../lib/math";

interface ToggleProps {
	enabled: boolean;
}

const Results = styled.div`
	position: relative;
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

const ToggleHolder = styled.div`
	position: absolute;
	top: 1rem;
	left: 1rem;
	right: 1rem;
	bottom: 1rem;
`;

const Toggle = styled.div`
	cursor: pointer;
	display: flex;
	margin-left: auto;
	background: ${mainBgColor};
	border-radius: 0.5rem;
	padding: 0.25rem;
	width: 4.15rem;
`;

const ToggleButton = styled.button<ToggleProps>`
	cursor: pointer;
	font-size: 0.75rem;
	padding: 0.25rem;
	border: none;
	background: ${(props) =>
		props.enabled ? primaryColor(props) : mainBgColor(props)};
	opacity: 50;
	border-radius: 0.5rem;
	color: ${textColor};
	vertical-align: middle;
	height: 100%;
	height: 1.5rem;

	&:focus {
		outline: none;
	}
`;

const RightToggle = styled(ToggleButton)`
	margin-left: 0.25rem;
`;

const Result = ({
	investment,
	pool,
	weeks,
}: {
	investment: string;
	pool: Pool;
	weeks: number;
}) => {
	const [apr, setApr] = useState(true);

	const weeklyApr = (parseFloat(pool.apr) / 365) * 7;
	const money = investment === "" ? 0 : parseFloat(investment);
	const earnedMoney = apr
		? weeklyApr * weeks * money
		: calculateProfit(money, weeklyApr, weeks);
	const percent = (earnedMoney / money) * 100 || 0;

	return (
		<Results>
			<ToggleHolder>
				<Toggle
					onClick={() => {
						setApr(!apr);
					}}
				>
					<ToggleButton enabled={apr}>APR</ToggleButton>
					<RightToggle enabled={!apr}>APY</RightToggle>
				</Toggle>
			</ToggleHolder>
			<Title>Estimated Profits:</Title>
			<Yield>+{percent.toFixed(2)}%</Yield>
			<Money>${earnedMoney.toFixed(2)}</Money>
		</Results>
	);
};

export default Result;
