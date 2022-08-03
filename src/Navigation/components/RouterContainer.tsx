import React, { useContext } from 'react'
import { sessionContext } from '../../App'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function RouterContainer() {
	const context = useContext(sessionContext);
	return (
		<Router>
			<Routes>
				<Route path='/'></Route>
				<Route path='/login'></Route>
				<Route path='/logout'></Route>
				<Route path='/register'></Route>
				<Route path='/home'></Route>
			</Routes>
		</Router>
	)
}


export default RouterContainer