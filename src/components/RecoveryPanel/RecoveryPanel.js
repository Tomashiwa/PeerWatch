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
const SPINNER_MSG_RECOVERING = "Recovering...";

function RecoveryPanel({ sendCallback, cancelCallback }) {
	const emailRef = useRef(null);
	const [unauthFlag, setUnauthFlag] = useState(false);
	const [unauthError, setUnauthError] = useState("");
	const [generalFlag, setGeneralFlag] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const resetErrors = () => {
		setGeneralFlag(false);
		setUnauthFlag(false);
	};

	const send = async (e) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			resetErrors();
			await axios.post(`${SERVER_URL}/api/auth/recover`, {
				email: emailRef.current.value,
			});
			sendCallback();
		} catch (err) {
			if (err.response?.status === UNAUTH_ERROR_CODE) {
				setUnauthFlag(true);
				setUnauthError(err.response.data.message);
			} else {
				setGeneralFlag(true);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Panel rowGap="1em" isLoading={isLoading} loadMsg={SPINNER_MSG_RECOVERING}>
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
