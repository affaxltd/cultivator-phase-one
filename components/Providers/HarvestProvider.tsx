import React, { PropsWithChildren, useEffect, useState } from "react";
import { HarvestState, HarvestContext } from "../../state/harvest";
import { store } from "react-notifications-component";
import { HarvestRequest } from "../../types/harvest";
import { useAsyncEffect } from "../../lib/effect";
import { apyToApr } from "../../lib/money";
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
				store.addNotification({
					title: "Error",
					message:
						"There was an error fetching data from the Harvest api, please try again later",
					type: "danger",
					dismiss: {
						duration: 5000,
						onScreen: true,
					},
					animationIn: ["animated animated", "animated fadeIn"],
					animationOut: ["animated animated", "animated fadeOut"],
					container: "top-center",
					insert: "top",
				});
				return;
			}

			const data = (await fetched.json()) as HarvestRequest;

			setState({
				loaded: true,
				pools: data.pools.map((pool) => {
					pool.apr = apyToApr(parseFloat(pool.apr)).toString();
					return pool;
				}),
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
