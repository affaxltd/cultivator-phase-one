import styled from "styled-components";
import { green, mainBgColor, brandColor, textColor } from "../../style/theme";
import { P } from "../Base/Text";
import { useContext, useState } from "react";
import { calculateProfit, currencies } from "../../lib/money";
import { HarvestContext } from "../../state/harvest";
import { CalculatorContext } from "../../state/calculator";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import Chart from "./Chart";

interface ToggleProps {
	enabled: boolean;
}

const Results = styled.div`
	position: relative;
	background: ${brandColor}59;
	padding: 1.5rem;
	margin-top: 2rem;
	border-radius: 1rem;
	overflow-x: visible;
`;

const ResultHolder = styled.div`
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

const Toggle = styled.div`
	margin-bottom: 0.5rem;
	cursor: pointer;
	display: flex;
	background: ${mainBgColor};
	border-radius: 0.5rem;
	padding: 0.25rem;
	width: 7.65rem;
`;

const ToggleButton = styled.button<ToggleProps>`
	user-select: none;
	cursor: pointer;
	font-size: 0.75rem;
	padding: 0.25rem;
	border: none;
	background: ${(props) =>
		props.enabled ? brandColor(props) : mainBgColor(props)};
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

const ChartTitle = styled(P)`
	margin-top: 2rem;
	margin-bottom: 1rem;
	font-size: 1.5rem;
`;

const ChartHolder = styled.div`
	width: 100%;
	height: 12rem;
`;

const RightToggle = styled(ToggleButton)`
	margin-left: 0.25rem;
`;

const Result = () => {
	const [apr, setApr] = useState(true);
	const { pools } = useContext(HarvestContext);
	const { pool, investment, weeks, currency } = useContext(CalculatorContext);

	const weeklyApr = (parseFloat(pools[pool].apr) / 365) * 7;
	const money = investment === "" ? 0 : parseFloat(investment);
	const earnedMoney = apr
		? weeklyApr * weeks * money
		: calculateProfit(money, weeklyApr, weeks);
	const percent = (earnedMoney / money) * 100 || 0;

	const profit = Array.from(Array(weeks).keys()).map((week) => ({
		week: week + 1,
		profit: apr
			? money * weeklyApr * (week + 1)
			: calculateProfit(money, weeklyApr, week + 1),
	}));

	const ProfitChart = Chart({
		profit,
	});

	return (
		<>
			<Results>
				<ResultHolder>
					<Toggle
						onClick={() => {
							setApr(!apr);
						}}
					>
						<ToggleButton enabled={apr}>APR</ToggleButton>
						<RightToggle enabled={!apr}>Compounding</RightToggle>
					</Toggle>
					<Title>Estimated Profits:</Title>
					<Yield>+{percent.toFixed(2)}%</Yield>
					<Money>
						{currencies.get(currency)}
						{earnedMoney.toFixed(2)}
					</Money>
				</ResultHolder>
			</Results>

			<ChartTitle>Profit over weeks:</ChartTitle>
			<ChartHolder>
				<ParentSize>
					{({ width, height }) => (
						<ProfitChart width={width} height={height} />
					)}
				</ParentSize>
			</ChartHolder>
		</>
	);
};

export default Result;
