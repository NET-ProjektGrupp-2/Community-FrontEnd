import React, { useContext, useEffect } from 'react'
import { sessionContext } from '../../index'
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Login from '../../Authentication/components/Login';
import Logout from '../../Authentication/components/Logout';
import * as keys from '../../GlobalConst';
import Register from '../../Authentication/components/Register';
import LoadingResponse from './LoadingResponse';

function RouterContainer() {
	const context = useContext(sessionContext);
	const location = useLocation();
	useEffect(() => {

		return () => {
		}
	}, [context.navState])

	return (
		<Router>
			<Routes>
				{
					
					<LoadingResponse requester="asd" state={location.state} />
				}
				<Route path={keys.EKey_NavLogin}>
					<Login state={location.state}/>
				</Route>
				<Route path={keys.EKey_NavLogout}>
					<Logout />
				</Route>
				<Route path='/register'>
					<Register />
				</Route>
				<Route path='/*'>
					<Route ></Route>
				</Route>
			</Routes>
		</Router>
	)
}


export default RouterContainer