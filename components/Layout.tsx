import React, { PropsWithChildren } from "react";
import Head from "next/head";
import styled from "styled-components";
import Header from "./Header";

const BodyDiv = styled.div`
	background: white;
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	width: 100%;
`;

const Content = styled.div`
	flex-grow: 1;
`;

const Layout = ({
	children,
	title,
}: PropsWithChildren<{
	title: string;
}>) => {
	return (
		<>
			<Head>
				<title>{title} | Okto Pricing</title>
			</Head>
			<BodyDiv>
				<Header />
				<Content>{children}</Content>
			</BodyDiv>
		</>
	);
};

export default Layout;
