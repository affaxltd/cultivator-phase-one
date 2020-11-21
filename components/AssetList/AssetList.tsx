import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Search, X } from "react-feather";
import styled from "styled-components";
import { useChangeString } from "../../hooks/input";
import { cleanName } from "../../lib/pool";
import { CalculatorContext } from "../../state/calculator";
import { HarvestContext } from "../../state/harvest";
import { customColor, customColorText } from "../../style/color";
import { shadowMd } from "../../style/shadow";
import { secondaryBgColor, textColor } from "../../style/theme";
import { radius } from "../../style/variables";
import Horizontal from "../Base/Horizontal";
import { P } from "../Base/Text";
import Vertical from "../Base/Vertical";

interface ButtonProps {
	textColor?: string;
}

const ListWrapper = styled.div`
	position: fixed;
	z-index: 10;
	top: 0px;
	right: 0px;
	bottom: 0px;
	left: 0px;
	overflow-y: auto;
`;

const ListContainer = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: center;
	min-height: 100vh;
	padding-top: 1rem 1rem 5rem 1rem;
	text-align: center;

	@media (min-width: 640px) {
		align-items: center;
		padding: 0;
	}
`;

const BgHolder = styled.div`
	position: fixed;
	top: 0px;
	right: 0px;
	bottom: 0px;
	left: 0px;
`;

const Bg = styled.div`
	position: absolute;
	top: 0px;
	right: 0px;
	bottom: 0px;
	left: 0px;
	opacity: 0.75;
	background: black;
`;

const Huh = styled.span`
	display: none;

	@media (min-width: 640px) {
		display: inline-block;
		align-items: center;
		height: 100vh;
	}
`;

const ContentWrapper = styled.div`
	width: 100%;
	margin: 2rem;
	max-width: 24rem;
	display: inline-block;
	vertical-align: bottom;
	background-color: ${secondaryBgColor};
	border-radius: 1rem;
	text-align: left;
	overflow: hidden;
	box-shadow: ${shadowMd};
	transform: translateX(0) translateY(0) rotate(0) skewX(0) skewY(0) scaleX(1)
		scaleY(1);

	@media (min-width: 640px) {
		margin: 2rem 0;
		vertical-align: center;
		width: 100%;
	}
`;

const TopBar = styled.div`
	height: 3rem;
	width: 100%;
	display: flex;
`;

const SearchWrapper = styled.div`
	width: 3rem;
	height: 3rem;
	flex-grow: 1;
`;

const SearchIcon = styled.div`
	color: ${textColor};
	width: 3rem;
	height: 3rem;
	flex-grow: 0;
`;

const Button = styled.button<ButtonProps>`
	width: 100%;
	cursor: pointer;
	display: inline-flex;
	justify-content: center;
	border-radius: ${radius};
	border: none;
	padding: 0.5rem 1rem;
	background: ${customColor};
	color: ${customColorText};
	font-size: 1rem;
	line-height: 1.5rem;
	font-weight: 500;

	&:hover {
		filter: brightness(120%);
	}

	&:focus {
		outline: none;
	}

	@media (min-width: 640px) {
		margin-left: 0.75rem;
		width: auto;
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
`;

const Content = styled.div`
	padding: 1rem;
	padding-top: 0;
	max-height: 14.5rem;
	overflow-y: auto;
	margin-bottom: 1rem;
`;

const CloseButton = styled(Button)`
	padding: 0;
	margin-left: 1rem;
	width: 3rem;
	height: 3rem;
	flex-grow: 0;
	border-radius: 1rem;
`;

const AssetInput = styled.input`
	text-transform: uppercase;
	font-size: 1rem;
	width: 100%;
	height: 3rem;
	background: none;
	color: ${textColor};
	border: none;

	&:focus {
		outline: none;
	}
`;

const PoolWrapper = styled.button`
	background: ${secondaryBgColor};
	border: none;
	cursor: pointer;
	display: flex;
	border-radius: ${radius};
	margin-top: 0.5rem;
	height: 2rem;
	width: 100%;

	&:focus {
		outline: none;
	}
`;

const PoolImage = styled.img`
	height: 1.5rem;
	width: 1.5rem;
	margin-right: 0.5rem;
`;

const PoolText = styled(P)`
	font-size: 1rem;
`;

const NoItems = styled(P)`
	margin-top: 0.5rem;
`;

const APYVertical = styled(Vertical)`
	flex-grow: 1;
`;

const APYText = styled(PoolText)`
	width: 100%;
	text-align: right;
`;

const AssetList = ({ close }: { close: Dispatch<SetStateAction<boolean>> }) => {
	const [search, setSearch] = useState("");
	const { pools } = useContext(HarvestContext);
	const state = useContext(CalculatorContext);
	const { setState } = state;

	const filteredPools = pools
		.filter((pool) =>
			cleanName(pool.name).toLowerCase().includes(search.toLowerCase())
		)
		.sort((a, b) => parseFloat(b.apr) - parseFloat(a.apr));

	return (
		<ListWrapper>
			<ListContainer>
				<BgHolder aria-hidden="true">
					<Bg />
				</BgHolder>

				<Huh aria-hidden="true">&#8203;</Huh>

				<ContentWrapper
					role="dialog"
					aria-modal="true"
					aria-labelledby="modal-headline"
				>
					<TopBar>
						<SearchIcon>
							<Vertical>
								<Horizontal>
									<Search size={16} />
								</Horizontal>
							</Vertical>
						</SearchIcon>

						<SearchWrapper>
							<AssetInput
								placeholder="ETH"
								value={search}
								onChange={useChangeString(setSearch)}
							/>
						</SearchWrapper>

						<CloseButton
							color="secondaryBgColor"
							textColor="textColor"
							onClick={() => {
								close(false);
							}}
						>
							<Vertical>
								<X />
							</Vertical>
						</CloseButton>
					</TopBar>

					<Content>
						{filteredPools.length === 0 && (
							<NoItems>No items found!</NoItems>
						)}

						{filteredPools.map((pool) => (
							<PoolWrapper
								key={pool.name}
								onClick={() => {
									if (parseFloat(pool.apr) < 0.0001) return;

									close(false);
									setState({
										...state,
										pool: pools.indexOf(pool),
									});
								}}
							>
								<Vertical>
									<PoolImage
										src={pool.logo.replace(".svg", ".png")}
										alt=":logo:"
									/>
								</Vertical>

								<Vertical>
									<PoolText>
										{`${cleanName(pool.name)} Pool`}
									</PoolText>
								</Vertical>

								<APYVertical>
									<APYText>
										{parseFloat(pool.apr) > 0.0001
											? `${(
													parseFloat(pool.apr) * 100
											  ).toFixed(2)}%`
											: "Inactive"}
									</APYText>
								</APYVertical>
							</PoolWrapper>
						))}
					</Content>
				</ContentWrapper>
			</ListContainer>
		</ListWrapper>
	);
};

export default AssetList;
