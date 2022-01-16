import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { theme } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import { CircularProgress } from "@mui/material";

import axios from "axios";

import UserContext from "./components/Context/UserContext";
import NavBar from "./components/NavBar/NavBar";
import AppWrapper from "./App.styled";

import Routes from "./services/Routes";

import { SERVER_URL } from "./util/url";

function App() {
	const [userInfo, setUserInfo] = useState({
		userId: undefined,
		displayName: undefined,
		email: undefined,
		token: undefined,
		isLoaded: false,
	});

	const authLocalToken = async () => {
		try {
			let userToken = localStorage.getItem("token");
			if (!userToken) {
				localStorage.setItem("token", "");
				userToken = "";
			}

			const config = { headers: { Authorization: `Bearer ${userToken}` } };
			const res = await axios.post(`${SERVER_URL}/api/auth/authtoken`, {}, config);
			setUserInfo({
				userId: res.data.userId,
				displayName: res.data.displayName,
				email: res.data.email,
				token: res.data.token,
				isLoaded: true,
			});
		} catch (err) {
			setUserInfo({
				userId: undefined,
				displayName: undefined,
				email: undefined,
				token: undefined,
				isLoaded: true,
			});
		}
	};

	const SuspenseSpinner = (
		<div className="center-screen stretch-height">
			<CircularProgress color="warning" />
		</div>
	);

	useEffect(() => authLocalToken(), []);

	return (
		<Router>
			<ThemeProvider theme={theme}>
				<UserContext.Provider value={{ userInfo, setUserInfo }}>
					<AppWrapper>
						<div className="app-navbar">
							<NavBar />
						</div>
						<div className="app-content">
							<Suspense fallback={SuspenseSpinner}>
								<Routes />
							</Suspense>
						</div>
					</AppWrapper>
				</UserContext.Provider>
			</ThemeProvider>
		</Router>
	);
}

export default App;
