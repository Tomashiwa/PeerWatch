import styled from "styled-components";
import { styled as mStyled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { theme } from "../../styles/theme";

export const FullPageWrapper = styled.div`
	background: ${(props) => props.theme.lightGray};
	height: 100%;
	max-height: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	h2 {
		color: ${(props) => props.theme.white};
		margin-bottom: 10px;
	}

	p {
		color: ${(props) => props.theme.white};
		margin-bottom: 20px;
	}
`;

export const ButtonContainerWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-column-gap: 1em;
`;

export const ButtonWrapper = mStyled(Button)({
	background: theme.orange,
	color: theme.darkGray,
	":hover": {
		background: theme.darkOrange,
	},
});
