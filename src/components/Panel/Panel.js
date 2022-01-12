import React from "react";
import { PanelWrapper } from "./Panel.styled";

function Panel({ rowGap, children }) {
	return <PanelWrapper rowGap={rowGap}>{children}</PanelWrapper>;
}

export default Panel;
