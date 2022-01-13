import React from "react";
import { PanelWrapper } from "./Panel.styled";
import Spinner from "../Spinner/Spinner";

function Panel({ rowGap, children, isLoading = false, loadMsg = "Loading..." }) {
	if (isLoading) {
		return <Spinner message={loadMsg} />;
	}
	return <PanelWrapper rowGap={rowGap}>{children}</PanelWrapper>;
}

export default Panel;
