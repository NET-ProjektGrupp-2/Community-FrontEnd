import './App.css';
import NavContainer from './Navigation/components/NavContainer';
import RouterContainer from './Navigation/components/RouterContainer';
import { BrowserRouter as Router } from 'react-router-dom';
import DataStore, {  } from 'Data/DataStore';
import React from 'react';
import { User } from 'Data/User';

export const sessionContext = React.createContext({
	user: {} as User | undefined,
	dataStore: new DataStore()
});

export default function App() {
	const dataStore = new DataStore();
	// dataStore.InitDummyData();
	dataStore.Init();
	
	return (
		<div className="App">
			<sessionContext.Provider value={{ user: undefined, dataStore}}>
				<Router >
					<NavContainer />
					<RouterContainer />
				</Router>
			</sessionContext.Provider>
		</div>
	);
}

