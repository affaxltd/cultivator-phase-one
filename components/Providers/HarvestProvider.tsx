import React, { PropsWithChildren, useEffect, useState } from "react";
import { HarvestState, HarvestContext } from "../../state/harvest";
import { HarvestRequest } from "../../types/harvest";
import { useAsyncEffect } from "../../lib/effect";
import { apiUrl } from "../../lib/api";

const HarvestProvider = ({ children }: PropsWithChildren<{}>) => {
	const [state, setState] = useState<HarvestState>({
		loaded: false,
		pools: [],
	});

	useEffect(
		useAsyncEffect(async () => {
			const fetched = await fetch(apiUrl("/data"));

			if (fetched.status !== 200) {
				// TODO: Error message
				return;
			}

			const data = (await fetched.json()) as HarvestRequest;

			setState({
				loaded: true,
				pools: data.pools,
			});
		}),
		[]
	);

	return (
		<HarvestContext.Provider value={state}>
			{children}
		</HarvestContext.Provider>
	);
};

export default HarvestProvider;
