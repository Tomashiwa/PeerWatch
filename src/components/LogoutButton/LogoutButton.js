import React from "react";
import { ButtonWrapper } from "./LogoutButton.styled";

function LogoutButton({ clickCallback }) {
	return <ButtonWrapper onClick={clickCallback}>Logout</ButtonWrapper>;
}

export default LogoutButton;
