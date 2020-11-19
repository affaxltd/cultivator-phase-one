import { PropsWithChildren } from "react";
import styled from "styled-components";
import { shadowMd } from "../style/shadow";
import { secondaryBgColor } from "../style/theme";

const Wrapper = styled.div`
	width: 100%;
	border-radius: 2rem;
	background: ${secondaryBgColor};
	box-shadow: ${shadowMd};
`;

const Content = styled.div`
	padding: 2rem;
`;

const Card = ({ children }: PropsWithChildren<{}>) => (
	<Wrapper>
		<Content>{children}</Content>
	</Wrapper>
);

export default Card;
