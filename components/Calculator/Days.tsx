import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { useChangeInt } from "../../hooks/input";
import { primaryColor } from "../../style/theme";
import { P, Span } from "../Text";

interface SliderProps {
	slideVal: number;
}

const Profit = styled.div`
	width: 100%;
	margin-top: 1.5rem;
`;

const SliderHolder = styled.div`
	margin-top: 0.5rem;
	width: 100%;
`;

const Investment = styled(P)`
	font-size: 1.25rem;
`;

const Slider = styled.input<SliderProps>`
	background: transparent;
	-webkit-appearance: none;
	width: 100%;
	height: 0.5rem;
	border-radius: 999999px;
	outline: none;

	background-image: -webkit-gradient(
		linear,
		left top,
		right top,
		color-stop(${(props: any) => props.slideVal || ""}, ${primaryColor}59),
		color-stop(
			${(props: any) => props.slideVal || ""},
			rgba(255, 255, 255, 0.1)
		)
	);

	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		border-radius: 999999px;
		width: 1.25rem;
		height: 1.25rem;
		background: ${primaryColor};
		cursor: pointer;
	}

	&::-moz-range-thumb {
		border-radius: 999999px;
		width: 1.25rem;
		height: 1.25rem;
		background: ${primaryColor};
		cursor: pointer;
	}

	&::-moz-range-progress {
		background: red;
	}

	&::-webkit-progress-value {
		background: red;
	}
`;

const min = 7;
const max = 1461;

const Days = ({
	state: [value, setValue],
}: {
	state: [number, Dispatch<SetStateAction<number>>];
}) => {
	const val = Math.max(0.00001, (value - min) / (max - min));

	return (
		<Profit>
			<Investment>
				{value} <Span color="fadeoutTextColor">Days</Span>
			</Investment>
			<SliderHolder>
				<Slider
					type="range"
					min={min}
					max={max}
					value={value}
					onChange={useChangeInt(setValue)}
					slideVal={val}
				/>
			</SliderHolder>
		</Profit>
	);
};

export default Days;
