export type CompleteState<T> = T & {
	setState: (value: T) => void;
};
