import { styled as mStyled } from "@mui/material/styles";
import { TextField, Button } from "@mui/material";
import { theme } from "../../styles/theme";
import styled from "styled-components";

export const TextFieldWrapper = mStyled(TextField)({
	width: "100%",
	".MuiInputBase-root": {
		background: theme.white,
		borderRadius: "5px",
		color: `${theme.darkGray}`,
	},
});

export const ButtonWrapper = mStyled(Button)({
	width: "50%",
	background: theme.orange,
	color: theme.darkGray,
	":hover": {
		background: theme.darkOrange,
	},
});

export const FormWrapper = styled.form`
	width: 100%;
	height: 100%;

	display: grid;
	grid-template-columns: 1fr;
	grid-row-gap: 1em;
	align-items: center;
	justify-items: center;
`;
