import styled from "styled-components";

const Link = styled.a`
	text-decoration: none;
	color: ${(props) => props.theme[props.color || "textColor"]};
`;

export default Link;
