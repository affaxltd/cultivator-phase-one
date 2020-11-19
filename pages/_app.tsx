import { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";
import { useEffect } from "react";
import "../styles/font.css";

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    transition-property: all;
    transition-duration: 200ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    font-family: 'Inter var', sans-serif;
  }
`;

const MyApp = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		document.documentElement.lang = "en";
	});

	return (
		<>
			<GlobalStyles />
			<Component {...pageProps} />
		</>
	);
};

export default MyApp;
