import { styled as mStyled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { theme } from "../../styles/theme";

export const ButtonWrapper = mStyled(Button)({
	height: "40%",
	width: "75%",
	background: theme.orange,
	color: theme.darkGray,
	":hover": {
		background: theme.darkOrange,
	},
});
