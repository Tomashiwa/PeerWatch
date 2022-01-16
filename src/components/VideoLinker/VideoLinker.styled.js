import { styled as mStyled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import { theme } from "../../styles/theme";

export const TextFieldWrapper = mStyled(TextField)({
	width: "100%",
	".MuiInputBase-root": {
		background: theme.darkGray,
		color: `${theme.orange}`,
	},
	"input:-webkit-autofill": {
		"-webkit-box-shadow": `0 0 0 50px ${theme.darkGray} inset`,
		"-webkit-text-fill-color": theme.orange,
	},
	"input:-webkit-autofill:focus": {
		"-webkit-box-shadow": `0 0 0 50px ${theme.darkGray} inset`,
		"-webkit-text-fill-color": theme.orange,
	},
});
