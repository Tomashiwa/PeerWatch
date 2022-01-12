import { styled as mStyled } from "@mui/material/styles";
import { TextField, Button } from "@mui/material";
import { theme } from "../../styles/theme";
import styled from "styled-components";

export const FormWrapper = styled.form`
	width: 100%;

	display: grid;
	grid-template-columns: 1fr;
	grid-row-gap: 1em;
	align-items: center;
	justify-items: center;
`;

export const TextFieldWrapper = mStyled(TextField)({
	width: "80%",
	".MuiFilledInput-input, .MuiFilledInput-input:hover": {
		background: theme.white,
		borderRadius: "2px",
		color: `${theme.darkGray}`,
	},
	"& .MuiFormHelperText-root": {
		color: theme.white,
	},
	"& .MuiInputLabel-root.Mui-focused": {
		color: theme.orange,
	},
	"& .MuiFilledInput-underline:after": {
		borderBottom: `2px solid ${theme.orange}`,
	},
});

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

export const RecoveryButtonWrapper = mStyled(Button)({
	color: theme.orange,
});
