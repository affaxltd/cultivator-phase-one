import { PropsWithChildren } from "react";
import styled from "styled-components";
import { shadowMd } from "../../style/shadow";
import { secondaryBgColor } from "../../style/theme";

interface ContentProps {
	overflow: string;
}

const Wrapper = styled.div`
	min-width: 100%;
	border-radius: 2rem;
	background: ${secondaryBgColor};
	box-shadow: ${shadowMd};
`;

const Content = styled.div<ContentProps>`
	padding: 2rem;
	overflow-x: ${(props) => (props.overflow === "true" ? "auto" : "inherit")};
`;

const Card = ({
	children,
	overflow = false,
}: PropsWithChildren<{
	overflow?: boolean;
}>) => (
	<Wrapper>
		<Content overflow={`${overflow}`}>{children}</Content>
	</Wrapper>
);

export default Card;
