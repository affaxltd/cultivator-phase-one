import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const Contain = styled.div`
	margin: 0 auto;
	max-width: 1200px;
	padding: 0 2rem;

	@media (max-width: 400px) {
		padding: 0 1rem;
	}
`;

const Wrapper = styled.div`
	width: 100%;
`;

const Container = ({ children }: PropsWithChildren<{}>) => (
	<Wrapper>
		<Contain>{children}</Contain>
	</Wrapper>
);

export default Container;
