export const useAsyncEffect = <T>(callback: () => Promise<T>) => () => {
	callback();
};
