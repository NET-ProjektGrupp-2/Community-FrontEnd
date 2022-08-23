import { Route, Routes } from "react-router-dom";
import Login from 'Authentication/components/Login';
import Logout from 'Authentication/components/Logout';
import * as keys from 'GlobalConst';
import Register from 'Authentication/components/Register';
import LoadingResponse from './LoadingResponse';
import Forums from "Forum/Component/Forums";
import Home from "Home/Components/Home";

function RouterContainer() {

	return (
		<>
		<LoadingResponse />
		<Routes>
			<Route path={keys.NKey_NavLogin} element={<Login />} />
			<Route path={keys.NKey_NavLogout} element={<Logout />} />
			<Route path={keys.NKey_NavRegister} element={<Register />} />
			<Route path={`${keys.NKey_NavForum}${keys.RKey_Wildcard}`} element={<Forums />}/>
			<Route path={keys.RKey_Wildcard} element={<Home />}/>

		</Routes></>
	)
}

export default RouterContainer