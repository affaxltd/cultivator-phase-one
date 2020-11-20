import HarvestProvider from "../components/Providers/HarvestProvider";
import { createGlobalStyle } from "styled-components";
import { AppProps } from "next/app";
import { useEffect } from "react";

import "isomorphic-fetch";
import "../css/font.css";

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    transition-property: all;
    transition-duration: 150ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    font-family: 'Inter var', sans-serif;
  }
`;

const MyApp = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		document.documentElement.lang = "en";
	});

	return (
		<HarvestProvider>
			<GlobalStyles />
			<Component {...pageProps} />
		</HarvestProvider>
	);
};

export default MyApp;
