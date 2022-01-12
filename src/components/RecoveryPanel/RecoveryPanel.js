import { Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import Panel from "../Panel/Panel";
import axios from "axios";
import {
	ButtonContainerWrapper,
	ButtonWrapper,
	FormWrapper,
	TextFieldWrapper,
} from "./RecoveryPanel.styled";
import { SERVER_URL } from "../../util/url";

const UNAUTH_ERROR_CODE = 401;

function RecoveryPanel({ sendCallback, cancelCallback }) {
	const emailRef = useRef(null);
	const [unauthFlag, setUnauthFlag] = useState(false);
	const [unauthError, setUnauthError] = useState("");
	const [generalFlag, setGeneralFlag] = useState(false);

	const resetErrors = () => {
		setGeneralFlag(false);
		setUnauthFlag(false);
	};

	const send = (e) => {
		e.preventDefault();

		resetErrors();

		axios
			.post(`${SERVER_URL}/api/auth/recover`, {
				email: emailRef.current.value,
			})
			.then((res) => {
				sendCallback();
			})
			.catch((err) => {
				if (err.response) {
					if (err.response.status === UNAUTH_ERROR_CODE) {
						setUnauthFlag(true);
						setUnauthError(err.response.data.message);
					} else {
						setGeneralFlag(true);
					}
				}
			});
	};

	return (
		<Panel rowGap="1em">
			<Typography variant="h5">Password Recovery</Typography>
			<Typography variant="body1">
				Please provide the email address you registered with down below. We will be sending
				you a link to reset your password!
			</Typography>
			{generalFlag && (
				<p style={{ color: "red" }}>
					Error when sending email to your email address. Please ask the PeerWatch team
					for assistance.
				</p>
			)}
			<FormWrapper onSubmit={send}>
				<TextFieldWrapper
					id="textfield-recovery-email"
					required
					error={unauthFlag}
					inputRef={emailRef}
					variant="filled"
					label="Email address"
					helperText={unauthFlag ? unauthError : ""}
				/>
				<ButtonContainerWrapper>
					<ButtonWrapper type="submit">Send</ButtonWrapper>
					<ButtonWrapper onClick={cancelCallback}>Cancel</ButtonWrapper>
				</ButtonContainerWrapper>
			</FormWrapper>
		</Panel>
	);
}

export default RecoveryPanel;
