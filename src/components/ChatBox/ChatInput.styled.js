import styled from "styled-components";
import { styled as mStyled } from "@mui/material/styles";
import { Button, TextField } from "@mui/material";
import { theme } from "../../styles/theme";

export const ChatInputWrapper = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;

	.chatinput-textfield {
		flex-grow: 1;
	}

	.chatinput-button {
		flex-grow: 0;
	}
`;

export const TextFieldWrapper = mStyled(TextField)({
	background: theme.white,
	color: theme.darkGray,
	borderRadius: "5px",
});

export const ButtonWrapper = mStyled(Button)({
	background: theme.orange,
	color: theme.darkGray,
	":hover": {
		background: theme.darkOrange,
	},
});
