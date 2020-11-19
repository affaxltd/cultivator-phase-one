import { banner, description, logo, title, url } from "../data/site";
import theme from "../style/theme";

const HeadTags = () => (
	<>
		<meta name="application-name" content={title} />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="default" />
		<meta name="apple-mobile-web-app-title" content={title} />
		<meta name="description" content={description} />
		<meta name="format-detection" content="telephone=no" />
		<meta name="mobile-web-app-capable" content="yes" />
		<meta name="msapplication-TileColor" content={theme.primaryColor} />
		<meta name="msapplication-tap-highlight" content="no" />

		<meta name="theme-color" content={theme.primaryColor} />
		<link rel="apple-touch-icon" sizes="512x512" href={logo} />
		<link rel="icon" type="image/png" sizes="512x512" href={logo} />
		<link rel="manifest" href="/manifest.json" />
		<link rel="icon" type="image/png" href={logo} />

		<meta name="twitter:card" content="summary" />
		<meta name="twitter:url" content={url} />
		<meta name="twitter:title" content={title} />
		<meta name="twitter:description" content={description} />
		<meta name="twitter:image" content={banner} />
		<meta name="twitter:creator" content="@AffaxDev" />

		<meta property="og:type" content="website" />
		<meta property="og:title" content={title} />
		<meta property="og:description" content={description} />
		<meta property="og:site_name" content={title} />
		<meta property="og:url" content={url} />
		<meta property="og:image" content={logo} />
	</>
);

export default HeadTags;
