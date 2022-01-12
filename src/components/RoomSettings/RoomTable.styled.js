import { styled as mstyled } from "@mui/material/styles";
import { TableContainer, Button } from "@mui/material";
import { theme } from "../../styles/theme";

export const TableContainerWrapper = mstyled(TableContainer)`
    max-height: 100%;

	.table-checkbox {
		color: ${theme.white};
	}

	.Mui-checked {
		color: ${theme.orange} !important;
	}

	th {
		background-color: ${theme.lightGray};
		color: ${theme.white};
	}
	
	td {
		color: ${theme.white};
	}
`;

export const KickButtonWrapper = mstyled(Button)({
	background: theme.orange,
	color: theme.darkGray,
	":hover": {
		background: theme.darkOrange,
	},
	marginLeft: "15px",
});
