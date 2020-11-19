import { radius } from "../../style/variables";
import { textColor } from "../../style/theme";
import styled from "styled-components";
import Cleave from "cleave.js/react";
import { P } from "../Text";
import { Dispatch, SetStateAction, useState } from "react";
import { useChangeString } from "../../hooks/input";
import { customColor } from "../../style/color";
import AssetList from "./AssetList";
import { Pool } from "../../interfaces/harvest";
import { animated, useTransition } from "react-spring";
import { cleanName } from "../../lib/pool";

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
	font-size: 1.5rem;
`;

const AssetImage = styled.img`
	margin-right: 0.5rem;
`;

const Animated = styled(animated.div)`
	transition: none;
`;

const Investment = ({
	state: [value, setValue],
	poolState: [index, setIndex],
	pools,
}: {
	state: [string, Dispatch<SetStateAction<string>>];
	poolState: [number, Dispatch<SetStateAction<number>>];
	pools: Pool[];
}) => {
	const color = value === "" ? "fadeoutTextColor" : "textColor";
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
							<AssetList
								setIndex={setIndex}
								close={setListOpen}
								pools={pools}
							/>
						</Animated>
					)
			)}

			<InvestmentText>Investment</InvestmentText>
			<Asset>
				<Dollar color={color}>$</Dollar>
				<Input
					placeholder="0.00"
					options={{
						numeral: true,
						numeralThousandsGroupStyle: "none",
					}}
					onChange={useChangeString(setValue)}
				/>
			</Asset>

			<AssetWrapper>
				<AssetButton
					onClick={() => {
						setListOpen(true);
					}}
				>
					<AssetImage
						src={pools[index].logo.replace(".svg", ".png")}
						height="16"
					/>{" "}
					{cleanName(pools[index].name)} Pool
				</AssetButton>
			</AssetWrapper>
		</section>
	);
};

export default Investment;
