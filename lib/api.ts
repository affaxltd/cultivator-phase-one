import env from "./env";

export const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const apiUrl = (path: string) => `${env.API_ENDPOINT}${path}`;
