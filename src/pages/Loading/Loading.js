import React from "react";
import Spinner from "../../components/Spinner/Spinner";
import { LoadingPageWrapper } from "./Loading.styled";

function Loading() {
	return (
		<LoadingPageWrapper>
			<Spinner message="Loading..." />
		</LoadingPageWrapper>
	);
}

export default Loading;
