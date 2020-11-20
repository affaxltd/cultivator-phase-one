import styled from "styled-components";
import { useLink } from "../../hooks/link";
import { textColor } from "../../style/theme";
import Container from "../Base/Container";
import Vertical from "../Base/Vertical";

const HeaderWrapper = styled.header`
	padding: 1.5rem 0;
	margin-bottom: 1rem;
`;

const Title = styled.button`
	background: transparent;
	color: ${textColor};
	font-size: 1.5rem;
	font-weight: 600;
	border: none;
	cursor: pointer;
	display: flex;

	&:focus {
		outline: none;
	}
`;

const LogoWrapper = styled.div`
	margin-left: 0.75rem;
`;

const Logo = styled.img`
	margin: auto 0;
	height: 1.75rem;
`;

const Header = () => {
	return (
		<HeaderWrapper>
			<Container>
				<Title onClick={useLink("/")}>
					Cultivator
					<LogoWrapper>
						<Vertical>
							<Logo src="/images/logo/logo.png" alt="👩‍🌾" />
						</Vertical>
					</LogoWrapper>
				</Title>
			</Container>
		</HeaderWrapper>
	);
};

export default Header;
