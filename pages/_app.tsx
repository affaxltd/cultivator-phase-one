import HarvestProvider from "../components/Providers/HarvestProvider";
import ReactNotification from "react-notifications-component";
import { createGlobalStyle } from "styled-components";
import { AppProps } from "next/app";

import "isomorphic-fetch";
import "react-notifications-component/dist/theme.css";
import "animate.css/animate.compat.css";
import "../css/font.css";
import "tippy.js/dist/tippy.css";

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

const MyApp = ({ Component, pageProps }: AppProps) => (
	<HarvestProvider>
		<ReactNotification />
		<GlobalStyles />
		<Component {...pageProps} />
	</HarvestProvider>
);

export default MyApp;
