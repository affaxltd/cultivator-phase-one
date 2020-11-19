import styled from "styled-components";
import { useState } from "react";
import Card from "../Card";
import Days from "./Days";
import Investment from "./Investment";
import Result from "./Result";
import useSWR from "swr";
import { apiUrl, fetcher } from "../../lib/api";
import { HarvestRequest } from "../../interfaces/harvest";
import Loader from "../Loader";

const Section = styled.section`
	max-width: 500px;
	margin: 0 auto;
	margin-top: 4rem;
`;

const Calculator = () => {
	const [selectedAsset, setSelectedAsset] = useState(0);
	const [investment, setInvestment] = useState("");
	const [days, setDays] = useState(30);
	const { data } = useSWR<HarvestRequest>(apiUrl("/data"), fetcher);

	return (
		<Section id="calculator">
			<Loader visible={data !== undefined}>
				{data && (
					<Card>
						<Investment
							pools={data.pools}
							state={[investment, setInvestment]}
							poolState={[selectedAsset, setSelectedAsset]}
						/>
						<Days state={[days, setDays]} />
						<Result
							investment={investment}
							pool={data.pools[selectedAsset]}
							days={days}
						/>
					</Card>
				)}
			</Loader>
		</Section>
	);
};

export default Calculator;
