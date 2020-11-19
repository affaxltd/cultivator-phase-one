import axios from "axios";

const apiRoot = "https://api.harvest.finance";
const apiKey = process.env.HARVEST_KEY;

export const requestClient = axios.create({
	baseURL: apiRoot,
	params: {
		key: apiKey,
	},
});
