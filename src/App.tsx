import React, { useContext } from 'react';
import { sessionContext } from './index';
import './App.css';
import NavContainer from './Navigation/components/NavContainer';
import RouterContainer from './Navigation/components/RouterContainer';
import { useNavigate, useLocation } from 'react-router-dom';

function App() {
	//const context = useContext(sessionContext);
	const location = useLocation();
	const navigate = useNavigate();
	const linkHandler = (eventKey: string | null, e?: React.SyntheticEvent<unknown>) => {
		if (eventKey) {
			if (eventKey.startsWith("/") ) {
				navigate(eventKey, { state: e });
			}
			
		}
	};
	return (
		<div className="App">
			<NavContainer NavHandler={linkHandler}/>
			<RouterContainer />
		</div>
	);
}

export default App;
