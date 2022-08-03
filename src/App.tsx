import React, { useContext } from 'react';
import './App.css';
import { User } from './Data/User';
import NavContainer from './Navigation/components/NavContainer';
import RouterContainer from './Navigation/components/RouterContainer';

export const sessionContext = React.createContext({
	navState: "",
	user: {} as User | undefined
});
function App() {
	// const navHandler = (eventKey: string, e?: React.SyntheticEvent<unknown>) => {
	// 	context.NavState = eventKey
	// };
	return (
		<div className="App">
			<sessionContext.Provider value={{navState: "", user: undefined}}>
				<NavContainer />
				<RouterContainer />
			</sessionContext.Provider>
		</div>
	);
}

export default App;
