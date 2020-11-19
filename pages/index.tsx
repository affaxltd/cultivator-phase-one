import styled from "styled-components";
import Calculator from "../components/Calculator/";
import Container from "../components/Container";
import Hero from "../components/Hero";
import Layout from "../components/Layout";

const Content = styled.div`
	width: 100%;
	margin-top: 3rem;
`;

const IndexPage = () => (
	<Layout>
		<Container>
			<Content>
				<Hero />
				<Calculator />
			</Content>
		</Container>
	</Layout>
);

export default IndexPage;
