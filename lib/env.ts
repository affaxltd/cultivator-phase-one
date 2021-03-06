interface Env {
	API_ENDPOINT: string;
}

const prodEnv: Env = {
	API_ENDPOINT: "/api",
};

const devEnv: Env = {
	API_ENDPOINT: "/api",
};

const env = process.env.NODE_ENV === "production" ? prodEnv : devEnv;

export default env;
