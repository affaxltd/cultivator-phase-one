import styled, { ThemeProvider } from "styled-components";
import theme, { mainBgColor } from "../style/theme";
import React, { PropsWithChildren } from "react";
import { title } from "../data/site";
import Header from "./Header";
import Head from "next/head";

const BodyDiv = styled.div`
	background: ${mainBgColor};
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	width: 100%;
`;

const Content = styled.div`
	flex-grow: 1;
`;

const Layout = ({ children }: PropsWithChildren<{}>) => {
	return (
		<ThemeProvider theme={theme}>
			<Head>
				<title>{title}</title>
			</Head>
			<BodyDiv>
				<Header />
				<Content>{children}</Content>
			</BodyDiv>
		</ThemeProvider>
	);
};

export default Layout;
