import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import Panel from "../Panel/Panel";
import {
	ButtonContainerWrapper,
	ButtonWrapper,
	FormWrapper,
	TextFieldWrapper,
} from "./RegisterPanel.styled";
import UserContext from "../Context/UserContext";
import { SERVER_URL } from "../../util/url";

const CREDENTIALS_ERROR_CODE = 422;
const PASSWORD_ERROR_MSG = "Password must contain at least 8 characters, numbers, and letters.";
const PASSWORD_AGAIN_ERROR_MSG = "Please enter the same password.";
const DISPLAY_NAME_ERROR_MSG = "Display Name must contain at least 1 character.";

function RegisterPanel({ successCallback, cancelCallback }) {
	const nameRef = useRef(null);
	const emailRef = useRef(null);
	const passRef = useRef(null);
	const passAgainRef = useRef(null);
	const [generalFlag, setGeneralFlag] = useState(false);
	const [displayNameFlag, setDisplayNameFlag] = useState(false);
	const [emailFlag, setEmailFlag] = useState(false);
	const [emailError, setEmailError] = useState("");
	const [passwordFlag, setPasswordFlag] = useState(false);
	const [passwordAgainFlag, setPasswordAgainFlag] = useState(false);
	const { setUserInfo } = useContext(UserContext);

	const resetErrors = () => {
		setGeneralFlag(false);
		setDisplayNameFlag(false);
		setEmailFlag(false);
		setPasswordFlag(false);
		setPasswordAgainFlag(false);
	};

	const register = (e) => {
		e.preventDefault();

		resetErrors();

		axios
			.post(`${SERVER_URL}/api/auth/register`, {
				displayName: nameRef.current.value,
				email: emailRef.current.value,
				password: passRef.current.value,
				repeatedPassword: passAgainRef.current.value,
			})
			.then((res) => {
				// Add to context
				const newUserInfo = {
					userId: res.data.userId,
					displayName: res.data.displayName,
					email: res.data.email,
					token: res.data.token,
					isLoaded: true,
				};
				setUserInfo(newUserInfo);

				// Add token to browser
				localStorage.setItem("token", res.data.token);

				successCallback();
			})
			.catch((err) => {
				if (err.response) {
					if (err.response.status === CREDENTIALS_ERROR_CODE) {
						const errData = err.response.data.errors;
						let passErrMsgSet = false;
						let emailErrMsgSet = false;
						for (let i = 0; i < errData.length; i++) {
							if (errData[i].param === "displayName") {
								setDisplayNameFlag(true);
							} else if (errData[i].param === "email" && !emailErrMsgSet) {
								// take only first email error message
								emailErrMsgSet = true;
								setEmailFlag(true);
								setEmailError(errData[i].msg);
							} else if (errData[i].param === "repeatedPassword") {
								setPasswordAgainFlag(true);
							} else if (errData[i].param === "password" && !passErrMsgSet) {
								// take only first password error message
								passErrMsgSet = true;
								setPasswordFlag(true);
							}
						}
					} else {
						setGeneralFlag(true);
					}
				}
			});
	};

	return (
		<Panel rowGap="1em">
			<FormWrapper onSubmit={register}>
				{generalFlag && (
					<p style={{ color: "red" }}>
						Error when registering for account. Please ask the PeerWatch team for
						assistance.
					</p>
				)}
				<TextFieldWrapper
					id="textfield-register-name"
					required
					error={displayNameFlag}
					inputRef={nameRef}
					variant="filled"
					label="Display name"
					helperText={displayNameFlag ? DISPLAY_NAME_ERROR_MSG : ""}
				/>
				<TextFieldWrapper
					id="textfield-register-email"
					required
					error={emailFlag}
					inputRef={emailRef}
					variant="filled"
					label="Email address"
					helperText={emailFlag ? emailError : ""}
				/>
				<TextFieldWrapper
					id="textfield-register-pass"
					required
					error={passwordFlag}
					inputRef={passRef}
					variant="filled"
					label="Password"
					type="password"
					helperText={passwordFlag ? PASSWORD_ERROR_MSG : ""}
				/>
				<TextFieldWrapper
					id="textfield-register-pass-again"
					required
					error={passwordAgainFlag}
					inputRef={passAgainRef}
					variant="filled"
					label="Re-enter password"
					type="password"
					helperText={passwordAgainFlag ? PASSWORD_AGAIN_ERROR_MSG : ""}
				/>
				<ButtonContainerWrapper>
					<ButtonWrapper type="submit">Register</ButtonWrapper>
					<ButtonWrapper onClick={cancelCallback}>Cancel</ButtonWrapper>
				</ButtonContainerWrapper>
			</FormWrapper>
		</Panel>
	);
}

export default RegisterPanel;
