import { useSprings, animated } from "react-spring";
import { PropsWithChildren } from "react";
import styled from "styled-components";
import Spinner from "./Spinner";

const LoaderWrapper = styled.div`
	position: relative;
`;

const SpinnerWrapper = styled(animated.div)`
	width: 100%;
	position: absolute;
	top: 0;
`;

const SpinnerHolder = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`;

const Loader = ({
	visible = false,
	children,
}: PropsWithChildren<{
	visible: boolean;
}>) => {
	const states = [true, false];
	const springs = useSprings(
		2,
		states.map((state) => ({
			from: {
				opacity: !state ? 1 : 0,
			},
			opacity: state === visible ? 1 : 0,
			config: {
				mass: 1.5,
				tension: 500,
				friction: 50,
			},
		}))
	);

	return (
		<LoaderWrapper>
			{visible && (
				<animated.div style={springs[0]}>{children}</animated.div>
			)}
			<SpinnerWrapper style={springs[1]}>
				<SpinnerHolder>
					<Spinner />
				</SpinnerHolder>
			</SpinnerWrapper>
		</LoaderWrapper>
	);
};

export default Loader;
