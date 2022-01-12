import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { LoadingPageWrapper } from "./Loading.styled";

function Loading() {
	return (
		<LoadingPageWrapper>
			<CircularProgress color="warning" />
			<Typography variant="h6">Loading...</Typography>
		</LoadingPageWrapper>
	);
}

export default Loading;
