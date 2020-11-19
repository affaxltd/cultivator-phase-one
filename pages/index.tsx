import Link from "next/link";
import Container from "../components/Container";
import Layout from "../components/Layout";

const IndexPage = () => (
	<Layout title="Home">
		<Container>
			<h1>Hello Next.js 👋</h1>
			<p>
				<Link href="/about">
					<a>About</a>
				</Link>
			</p>
		</Container>
	</Layout>
);

export default IndexPage;
