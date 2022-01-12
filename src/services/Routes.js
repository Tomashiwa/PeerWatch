import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";

import UserContext from "../components/Context/UserContext";

const Landing = React.lazy(() => import("../pages/Landing/Landing"));
const Room = React.lazy(() => import("../pages/Room/Room"));
const PleaseLogin = React.lazy(() => import("../pages/PleaseLogin/PleaseLogin"));
const Loading = React.lazy(() => import("../pages/Loading/Loading"));
const RoomAlreadyIn = React.lazy(() => import("../pages/Room/RoomAlreadyIn"));
const RoomFull = React.lazy(() => import("../pages/Room/RoomFull"));
const RoomNotFound = React.lazy(() => import("../pages/Room/RoomNotFound"));
const NotFound = React.lazy(() => import("../pages/NotFound/NotFound"));
const AccountReset = React.lazy(() => import("../pages/AccountReset/AccountReset"));

function Routes() {
	const { userInfo } = useContext(UserContext);

	return (
		<Switch>
			<Route path="/reset/:rid/:resetToken" component={AccountReset} />
			<Route path="/room/:id/alreadyin" component={RoomAlreadyIn} />
			<Route path="/room/:id/full" component={RoomFull} />
			{(!userInfo || (userInfo.isLoaded && userInfo.token === undefined)) && (
				<Route path="/room/:id" component={PleaseLogin} />
			)}
			{userInfo && userInfo.isLoaded && userInfo.token !== undefined && (
				<Route path="/room/:id" component={Room} />
			)}
			{userInfo && !userInfo.isLoaded && <Route path="/room/:id" component={Loading} />}
			<Route exact path="/room_notfound" component={RoomNotFound} />
			<Route exact path="/" component={Landing} />
			<Route path="*" component={NotFound} />
		</Switch>
	);
}

export default Routes;
