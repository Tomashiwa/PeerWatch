import { styled as mStyled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import { theme } from "../../styles/theme";

export const TextFieldWrapper = mStyled(TextField)({
	width: "100%",
	background: theme.darkGray,
	".MuiInputBase-root": {
		color: `${theme.orange}`,
	},
});
