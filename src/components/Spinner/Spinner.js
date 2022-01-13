import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { SpinnerDiv } from "./Spinner.styled";

function Spinner({ color = "warning", message = "" }) {
	return (
		<SpinnerDiv>
			<CircularProgress color={color} />
			<Typography align="center" variant="h6">
				{message}
			</Typography>
		</SpinnerDiv>
	);
}

export default Spinner;
