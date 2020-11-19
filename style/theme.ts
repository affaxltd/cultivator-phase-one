import { colors } from "./color";
import { StyleFunction, Theme } from "./style";

const theme: Theme = {
	...colors,
	mainBgColor: "#252F3F",
	secondaryBgColor: "#202937",
	textColor: "#FFFFFF",
	inverseTextColor: "#111118",
	fadeoutTextColor: "#757575",
	primaryColor: "#3E7EFF",
};

export default theme;

export const mainBgColor: StyleFunction = (props) => props.theme.mainBgColor;
export const secondaryBgColor: StyleFunction = (props) =>
	props.theme.secondaryBgColor;
export const textColor: StyleFunction = (props) => props.theme.textColor;
export const inverseTextColor: StyleFunction = (props) =>
	props.theme.inverseTextColor;
export const fadeoutTextColor: StyleFunction = (props) =>
	props.theme.fadeoutTextColor;
export const primaryColor: StyleFunction = (props) => props.theme.primaryColor;
export const transparent: StyleFunction = (props) => props.theme.transparent;
export const white: StyleFunction = (props) => props.theme.white;
export const green: StyleFunction = (props) => props.theme.green;
export const red: StyleFunction = (props) => props.theme.red;
