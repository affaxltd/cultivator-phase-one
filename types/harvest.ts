export interface Pool {
	name: string;
	pair: string;
	pairLink: string;
	logo: string;
	poolRewards: string[];
	apr: string;
	totalStaked: string;
}

export interface HarvestRequest {
	provider: string;
	provider_logo: string;
	provider_URL: string;
	links: Link[];
	pools: Pool[];
}

export interface Link {
	title: string;
	link: string;
}
