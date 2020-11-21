import { useContext, useEffect } from "react";
import styled from "styled-components";
import { currencies } from "../../lib/money";
import { CalculatorContext } from "../../state/calculator";
import { brandColor, secondaryBgColor, textColor } from "../../style/theme";
import { Currency } from "../../types/money";

interface ButtonProps {
	enabled: string;
}

const CurrencyHolder = styled.div`
	flex-direction: row;
	display: flex;
	justify-content: center;
	width: 100%;
	flex-wrap: wrap;
`;

const CurrencyButton = styled.button<ButtonProps>`
	cursor: pointer;
	color: ${(props) =>
		props.enabled === "true" ? "white" : textColor(props)};
	background: ${(props) =>
		props.enabled === "true" ? brandColor(props) : secondaryBgColor(props)};
	border: 1px solid ${brandColor};
	margin: 0.125rem;
	padding: 0.25rem 0.35rem;
	border-radius: 0.25rem;

	&:focus {
		outline: none;
	}
`;

const Currencies = () => {
	const state = useContext(CalculatorContext);
	const { currency, setState } = state;

	useEffect(() => {
		setState({
			...state,
			currency: (localStorage.getItem("currency") as Currency) || "usd",
		});
	}, []);

	return (
		<CurrencyHolder>
			{Array.from(currencies.entries()).map(([c, mark]) => (
				<CurrencyButton
					key={c}
					enabled={`${c === currency}`}
					onClick={() => {
						localStorage.setItem("currency", c);

						setState({
							...state,
							currency: c,
						});
					}}
				>
					{mark} {c.toUpperCase()}
				</CurrencyButton>
			))}
		</CurrencyHolder>
	);
};

export default Currencies;
