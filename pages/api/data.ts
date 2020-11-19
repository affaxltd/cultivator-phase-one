import { NowRequest, NowResponse } from "@vercel/node";
import { requestClient } from "./lib/_client";

export default async (_request: NowRequest, response: NowResponse) => {
	const { data, status, statusText } = await requestClient.get("/cmc");

	response.statusCode = status;
	response.statusMessage = statusText;
	response.send(data);
};
