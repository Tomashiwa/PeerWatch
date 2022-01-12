import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../components/Context/UserContext";
import LandingPageWrapper from "./Landing.styled";
import CreateRoomPanel from "../../components/CreateRoomPanel/CreateRoomPanel";
import JoinRoomPanel from "../../components/JoinRoomPanel/JoinRoomPanel";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import RegisterPanel from "../../components/RegisterPanel/RegisterPanel";
import LoginPanel from "../../components/LoginPanel/LoginPanel";
import RecoveryPanel from "../../components/RecoveryPanel/RecoveryPanel";

const PANEL_TYPE_REGISTER = "register";
const PANEL_TYPE_LOGIN = "login";
const PANEL_TYPE_RECOVERY = "recovery";

function Landing() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [accPanelType, setAccPanelType] = useState(PANEL_TYPE_LOGIN);
	const { userInfo, setUserInfo } = useContext(UserContext);

	const logOut = () => {
		// Remove token from browser
		localStorage.removeItem("token");
		setUserInfo({
			userId: undefined,
			displayName: undefined,
			email: undefined,
			token: undefined,
			isLoaded: true,
		});
	};

	const toRegister = () => {
		setAccPanelType(PANEL_TYPE_REGISTER);
	};

	const toLogin = () => {
		setAccPanelType(PANEL_TYPE_LOGIN);
	};

	const toRecovery = () => {
		setAccPanelType(PANEL_TYPE_RECOVERY);
	};

	useEffect(() => {
		setIsLoggedIn(userInfo.isLoaded && userInfo.token !== undefined);
	}, [userInfo]);

	return (
		<LandingPageWrapper elevation={0}>
			{isLoggedIn && (
				<>
					<div className="landing-room-center">
						{isLoggedIn && (
							<>
								<CreateRoomPanel />
								<JoinRoomPanel />
							</>
						)}
					</div>
					<div className="landing-room-bottom">
						{isLoggedIn && <LogoutButton clickCallback={logOut} />}
					</div>
				</>
			)}
			{!isLoggedIn && (
				<div className="landing-account-center">
					{accPanelType === PANEL_TYPE_REGISTER && (
						<RegisterPanel
							successCallback={() => {
								setIsLoggedIn(true);
								toLogin();
							}}
							cancelCallback={toLogin}
						/>
					)}
					{accPanelType === PANEL_TYPE_LOGIN && (
						<LoginPanel
							successCallback={() => setIsLoggedIn(true)}
							toRegisterCallback={toRegister}
							toRecoveryCallback={toRecovery}
						/>
					)}
					{accPanelType === PANEL_TYPE_RECOVERY && (
						<RecoveryPanel sendCallback={toLogin} cancelCallback={toLogin} />
					)}
				</div>
			)}
		</LandingPageWrapper>
	);
}

export default Landing;
