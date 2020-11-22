import Tippy from "@tippyjs/react";
import { useContext } from "react";
import { GitHub } from "react-feather";
import styled, { ThemeContext } from "styled-components";
import { useLink } from "../../hooks/link";
import { Theme } from "../../style/style";
import { mainBgColor, secondaryBgColor, textColor } from "../../style/theme";
import Container from "../Base/Container";
import Horizontal from "../Base/Horizontal";
import Vertical from "../Base/Vertical";

const HeaderContainer = styled(Container)`
	display: flex;
	justify-content: space-between;
`;

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

const ButtonHolder = styled.div`
	display: flex;
	flex-direction: row-reverse;
`;

const Button = styled.button`
	cursor: pointer;
	background: ${mainBgColor};
	width: 3rem;
	height: 3rem;
	border: none;
	border-radius: 0.5rem;

	&:hover {
		background: ${secondaryBgColor};
	}

	&:focus {
		outline: none;
	}
`;

const Header = () => {
	const theme = useContext<Theme>(ThemeContext);

	return (
		<HeaderWrapper>
			<HeaderContainer>
				<div>
					<Vertical>
						<Title onClick={useLink("/")}>
							Cultivator
							<LogoWrapper>
								<Vertical>
									<Logo
										src="/images/logo/logo.png"
										alt="👩‍🌾"
									/>
								</Vertical>
							</LogoWrapper>
						</Title>
					</Vertical>
				</div>

				<ButtonHolder>
					<Vertical>
						<Tippy content="Github">
							<Button
								onClick={() => {
									window.open(
										"https://github.com/affaxltd/cultivator-phase-one"
									);
								}}
							>
								<Horizontal>
									<Vertical>
										<GitHub
											size={18}
											color={theme.textColor}
										/>
									</Vertical>
								</Horizontal>
							</Button>
						</Tippy>
					</Vertical>
				</ButtonHolder>
			</HeaderContainer>
		</HeaderWrapper>
	);
};

export default Header;
