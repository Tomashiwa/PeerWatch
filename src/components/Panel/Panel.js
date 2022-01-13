import React from "react";
import { Typography, CircularProgress } from "@mui/material";
import { PanelWrapper, PanelSpinner } from "./Panel.styled";

function Panel({ rowGap, children, isLoading = false, loadMsg = "Loading..." }) {
	if (isLoading) {
		return (
			<PanelSpinner>
				<CircularProgress color="warning" />
				<Typography align="center" variant="h6">
					{loadMsg}
				</Typography>
			</PanelSpinner>
		);
	}
	return <PanelWrapper rowGap={rowGap}>{children}</PanelWrapper>;
}

export default Panel;
