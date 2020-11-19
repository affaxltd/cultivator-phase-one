import { ChangeEvent, Dispatch, SetStateAction } from "react";

type Action<T> = Dispatch<SetStateAction<T>>;

type Function<T> = (
	set: Action<T>
) => (e: ChangeEvent<HTMLInputElement>) => void;

export const useChangeString: Function<string> = (set) => (e) => {
	set(e.target.value);
};

export const useChangeInt: Function<number> = (set) => (e) => {
	set(parseInt(e.target.value));
};

export const useChangeFloat: Function<number> = (set) => (e) => {
	set(parseFloat(e.target.value));
};
