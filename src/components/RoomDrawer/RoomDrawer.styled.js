import styled from "styled-components";
import { styled as mStyled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { theme } from "../../styles/theme";

export const RoomDrawerWrapper = styled.div`
	display: grid;
	grid-template-columns: ${(props) => (props.isHost ? "1fr 1fr 1fr" : "1fr 1fr")};
	grid-column-gap: 1em;
`;

export const ButtonWrapper = mStyled(Button)({
	background: theme.orange,
	color: theme.darkGray,
	":hover": {
		background: theme.darkOrange,
	},
});
