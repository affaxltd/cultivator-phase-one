import { ThemedStyledProps } from "styled-components";

export interface Colors {
	transparent: string;
	white: string;
	green: string;
	red: string;
}

export interface Theme extends Colors {
	mainBgColor: string;
	secondaryBgColor: string;
	textColor: string;
	inverseTextColor: string;
	fadeoutTextColor: string;
	brandColor: string;
	lightBrandColor: string;
}

export interface StyleFunction {
	(props: ThemedStyledProps<{}, Theme>): string;
}
