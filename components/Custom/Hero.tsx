import { H1 } from "../Base/Text";
import Link from "../Base/Link";
import styled from "styled-components";

const HeroSection = styled.section`
	margin-bottom: 4rem;
`;

const Title = styled(H1)`
	text-align: center;
`;

const Hero = () => (
	<HeroSection id="hero">
		<Title>
			Calculate your profits for{" "}
			<Link
				color="primaryColor"
				href="https://harvest.finance/"
				target="_blank"
			>
				Harvest
			</Link>
			!
		</Title>
	</HeroSection>
);

export default Hero;
