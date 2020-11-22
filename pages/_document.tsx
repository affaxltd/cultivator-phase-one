import Document, {
	DocumentContext,
	Html,
	Head,
	Main,
	NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";
import HeadTags from "../components/Custom/HeadTags";

export default class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}

	render() {
		return (
			<Html lang="en">
				<Head>
					<HeadTags />
				</Head>
				<body>
					<Main />
					<div id="notification-root"></div>
					<NextScript />
				</body>
			</Html>
		);
	}
}
