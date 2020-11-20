import { Dispatch, FC, SetStateAction } from "react";
import { ChevronDown, IconProps } from "react-feather";
import styled from "styled-components";

const ArrowHolder = styled.div`
	cursor: pointer;
	width: 16px;
	height: 16px;
`;

interface ChevronProps {
	up: string;
}

const Chevron = styled<FC<IconProps & ChevronProps>>(ChevronDown)`
	transform: translateX(0) translateY(0)
		rotate(${(props) => (props.up === "true" ? "180deg" : "0")}) skewX(0)
		skewY(0) scaleX(1) scaleY(1);
`;

const SortArrow = ({
	current,
	selected,
	index,
	setCurrent,
	setSelected,
}: {
	current: number;
	selected: number;
	index: number;
	setCurrent: Dispatch<SetStateAction<number>>;
	setSelected: Dispatch<SetStateAction<number>>;
}) => (
	<ArrowHolder
		onClick={() => {
			setSelected(selected === index * 2 ? index * 2 + 1 : index * 2);
			setCurrent(index);
		}}
	>
		<Chevron
			up={`${current === index && selected === index * 2}`}
			size={16}
			strokeWidth={4}
		/>
	</ArrowHolder>
);

export default SortArrow;
