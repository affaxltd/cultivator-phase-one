import { H1 } from "../components/Text";
import Link from "../components/Link";
import styled from "styled-components";

const Title = styled(H1)`
	text-align: center;
`;

const Hero = () => (
	<section id="hero">
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
	</section>
);

export default Hero;
