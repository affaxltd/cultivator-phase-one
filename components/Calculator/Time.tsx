import { useContext } from "react";
import styled from "styled-components";
import { CalculatorContext } from "../../state/calculator";
import { brandColor } from "../../style/theme";
import { P, Span } from "../Base/Text";

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
		color-stop(${(props: any) => props.slideVal || ""}, ${brandColor}59),
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
		background: ${brandColor};
		cursor: pointer;
	}

	&::-moz-range-thumb {
		border-radius: 999999px;
		width: 1.25rem;
		height: 1.25rem;
		background: ${brandColor};
		cursor: pointer;
	}

	&::-moz-range-progress {
		background: red;
	}

	&::-webkit-progress-value {
		background: red;
	}
`;

const min = 2;
const max = 208;

const Days = () => {
	const state = useContext(CalculatorContext);
	const { weeks, setState } = state;

	const val = Math.max(0.00001, (weeks - min) / (max - min));

	return (
		<Profit>
			<Investment>
				{weeks} <Span color="fadeoutTextColor">Weeks</Span>
			</Investment>
			<SliderHolder>
				<Slider
					type="range"
					aria-label="days"
					min={min}
					max={max}
					value={weeks}
					onChange={(e) => {
						setState({
							...state,
							weeks: parseInt(e.target.value) || 0,
						});
					}}
					slideVal={val}
				/>
			</SliderHolder>
		</Profit>
	);
};

export default Days;
