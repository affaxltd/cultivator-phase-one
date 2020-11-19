import { ThemedStyledProps } from "styled-components";
import { Colors } from "./style";

export const customColor = (
	props: ThemedStyledProps<
		{
			color?: string;
		},
		any
	>
) => props.theme[props.color || "textColor"];

export const customColorText = (
	props: ThemedStyledProps<
		{
			textColor?: string;
		},
		any
	>
) => props.theme[props.textColor || "textColor"];

export const colors: Colors = {
	transparent: "transparent",
	white: "#ffffff",
	green: "#31c48d",
	red: "#e02424",
};
