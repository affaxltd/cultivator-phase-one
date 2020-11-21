import { radius } from "../../style/variables";
import { textColor } from "../../style/theme";
import styled from "styled-components";
import Cleave from "cleave.js/react";
import { P } from "../Base/Text";
import { useContext, useState } from "react";
import { customColor } from "../../style/color";
import AssetList from "../AssetList/AssetList";
import { animated, useTransition } from "react-spring";
import { cleanName } from "../../lib/pool";
import { HarvestContext } from "../../state/harvest";
import { CalculatorContext } from "../../state/calculator";
import { currencies } from "../../lib/money";

const Asset = styled.div`
	display: flex;
	margin-top: 0.25rem;
`;

const Dollar = styled(P)`
	font-size: 3rem;
	margin-right: 0.25rem;
`;

const Input = styled(Cleave)`
	color: ${customColor};
	width: 100%;
	font-size: 3rem;
	border: none;
	background: transparent;

	&:focus {
		outline: none;
	}
`;

const AssetWrapper = styled.div`
	margin-top: 0.5rem;
`;

const AssetButton = styled.button`
	display: flex;
	background: transparent;
	padding: 0.75rem 1rem;
	border-radius: ${radius};
	border: none;
	color: ${textColor};
	cursor: pointer;

	&:hover {
		background: rgba(0, 0, 0, 0.1);
	}

	&:focus {
		outline: none;
	}
`;

const InvestmentText = styled(P)`
	margin-top: 1.25rem;
	font-size: 1.5rem;
`;

const AssetImage = styled.img`
	margin-right: 0.5rem;
`;

const Animated = styled(animated.div)`
	transition: none;
`;

const Investment = () => {
	const state = useContext(CalculatorContext);
	const { investment, pool, currency, setState } = state;
	const { pools } = useContext(HarvestContext);

	const color = investment === "" ? "fadeoutTextColor" : "textColor";
	const [listOpen, setListOpen] = useState(false);

	const transitions = useTransition(listOpen, null, {
		from: { position: "absolute", opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		config: {
			duration: 250,
		},
	});

	return (
		<section id="investment">
			{transitions.map(
				({ item, key, props }) =>
					item && (
						<Animated key={key} style={props}>
							<AssetList close={setListOpen} />
						</Animated>
					)
			)}

			<InvestmentText>Investment</InvestmentText>

			<Asset>
				<Dollar color={color}>{currencies.get(currency)}</Dollar>
				<Input
					aria-label="investment"
					placeholder="0.00"
					options={{
						numeral: true,
						numeralThousandsGroupStyle: "none",
					}}
					onChange={(e) => {
						setState({
							...state,
							investment: e.target.value,
						});
					}}
				/>
			</Asset>

			<AssetWrapper>
				<AssetButton
					onClick={() => {
						setListOpen(true);
					}}
				>
					<AssetImage
						src={pools[pool].logo.replace(".svg", ".png")}
						height="16"
						alt=":logo:"
					/>{" "}
					{cleanName(pools[pool].name)} Pool
				</AssetButton>
			</AssetWrapper>
		</section>
	);
};

export default Investment;
