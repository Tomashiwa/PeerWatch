import { Typography } from "@mui/material";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router";
import Panel from "../Panel/Panel";
import axios from "axios";
import {
	ButtonWrapper,
	ButtonContainerWrapper,
	TextFieldWrapper,
	FormWrapper,
} from "./AccountResetPanel.styled";
import { SERVER_URL } from "../../util/url";

const CREDENTIALS_ERROR_CODE = 422;
const UNAUTH_ERROR_CODE = 401;
const PASSWORD_ERROR_MSG = "Password must contain at least 8 characters, numbers, and letters.";
const REPEAT_PASSWORD_ERROR_MSG = "Please enter the same password.";

function AccountResetPanel() {
	const { rid, resetToken } = useParams();
	const newPassRef = useRef(null);
	const repeatPassRef = useRef(null);
	const [passwordFlag, setPasswordFlag] = useState(false);
	const [repeatPassFlag, setRepeatPassFlag] = useState(false);
	const [unauthFlag, setUnauthFlag] = useState(false);
	const [unauthError, setUnauthError] = useState("");
	const [generalFlag, setGeneralFlag] = useState(false);
	const [isValid, setIsValid] = useState(true);
	const history = useHistory();

	const resetErrors = () => {
		setGeneralFlag(false);
		setUnauthFlag(false);
		setPasswordFlag(false);
		setRepeatPassFlag(false);
	};

	const authResetToken = useCallback(async () => {
		try {
			const config = { headers: { Authorization: `Bearer ${resetToken}` } };
			await axios.post(`${SERVER_URL}/api/auth/authreset`, { rid }, config);
		} catch (err) {
			setIsValid(false);
		}
	}, [resetToken, rid]);

	useEffect(() => authResetToken(), [authResetToken]);

	useEffect(() => {
		if (!isValid) {
			history.push("/notfound");
		}
	}, [history, isValid]);

	const resetPass = async (e) => {
		try {
			e.preventDefault();
			resetErrors();
			await axios.put(`${SERVER_URL}/api/auth/reset`, {
				rid: rid,
				password: newPassRef.current.value,
				repeatedPassword: repeatPassRef.current.value,
			});
			returnHome();
		} catch (err) {
			if (err.response && err.response.status === CREDENTIALS_ERROR_CODE) {
				const errors = err.response.data.errors;
				let passErrMsgSet = false;
				errors.forEach((error) => {
					if (error.param === "repeatedPassword") {
						setRepeatPassFlag(true);
					} else if (error.param === "password" && !passErrMsgSet) {
						// take only first password error message
						passErrMsgSet = true;
						setPasswordFlag(true);
					}
				});
			} else if (err.response && err.response.status === UNAUTH_ERROR_CODE) {
				setUnauthFlag(true);
				setUnauthError(err.response.data.message);
			} else {
				setGeneralFlag(true);
			}
		}
	};

	const returnHome = () => {
		history.push("/");
	};

	return (
		<Panel rowGap="1em">
			<FormWrapper onSubmit={resetPass}>
				<Typography variant="h5">Looks like you have forgotten your password?</Typography>
				<Typography variant="body1">
					Dont worry, we got you covered! Just enter the new password you want below and
					we are ready to go.
				</Typography>
				{generalFlag && (
					<p style={{ color: "red" }}>
						Error when resetting password for your account. Please ask the PeerWatch
						team for assistance.
					</p>
				)}
				{unauthFlag && <p style={{ color: "red" }}>{unauthError}</p>}
				<TextFieldWrapper
					id="textfield-reset-pass"
					required
					error={passwordFlag}
					inputRef={newPassRef}
					variant="filled"
					label="New password"
					type="password"
					helperText={passwordFlag ? PASSWORD_ERROR_MSG : ""}
				/>
				<TextFieldWrapper
					id="textfield-reset-pass-again"
					required
					error={repeatPassFlag}
					inputRef={repeatPassRef}
					variant="filled"
					label="Re-enter password"
					type="password"
					helperText={repeatPassFlag ? REPEAT_PASSWORD_ERROR_MSG : ""}
				/>
				<ButtonContainerWrapper>
					<ButtonWrapper type="submit">Confirm</ButtonWrapper>
					<ButtonWrapper onClick={returnHome}>Cancel</ButtonWrapper>
				</ButtonContainerWrapper>
			</FormWrapper>
		</Panel>
	);
}

export default AccountResetPanel;
