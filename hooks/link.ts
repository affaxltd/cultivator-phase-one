import { useRouter } from "next/dist/client/router";

export const useLink = (href: string) => {
	const router = useRouter();

	return () => {
		router.push(href);
	};
};
