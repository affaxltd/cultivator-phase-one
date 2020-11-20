import Calculator from "../components/Calculator/Calculator";
import { HarvestContext } from "../state/harvest";
import Container from "../components/Base/Container";
import Layout from "../components/Base/Layout";
import Loader from "../components/Base/Loader";
import styled from "styled-components";
import Hero from "../components/Custom/Hero";
import { useContext } from "react";
import PoolList from "../components/Custom/PoolList";

const Content = styled.div`
	width: 100%;
	margin-top: 3rem;
`;

const IndexPage = () => {
	const { loaded } = useContext(HarvestContext);

	return (
		<Layout>
			<Container>
				<Content>
					<Hero />
					<Loader visible={loaded}>
						<Calculator />
						<PoolList />
					</Loader>
				</Content>
			</Container>
		</Layout>
	);
};

export default IndexPage;
