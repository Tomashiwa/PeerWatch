import styled from "styled-components";
import { styled as mStyled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { theme } from "../../styles/theme";

export const NavBarWrapper = styled.nav`
	display: flex;
	flex-direction: row;
	align-items: center;
	background: ${(props) => props.theme.darkGray};

	padding: 5px;

	h4 {
		color: ${(props) => props.theme.white};
	}
	a {
		margin-left: 30px;
	}
`;

export const ButtonWrapper = mStyled(Button)({
	color: theme.orange,
	":hover": {
		color: theme.darkOrange,
	},
});
