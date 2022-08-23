import { Route, Routes, useParams } from 'react-router-dom';
import * as keys from 'GlobalConst';
import ForumNavList from 'Navigation/components/ForumNavList';
import TopicNavList from 'Navigation/components/TopicNavList';
import TopicComponent from './TopicComponent';
import { sessionContext } from 'App';
import { useContext, useEffect, useState } from 'react';

function ForumComponent() {
	
	const {dataStore} = useContext(sessionContext);
	const id = parseInt(useParams()["id"] ?? "0");
	const NewData = () => {
		setState({thisForum: dataStore.GetForum(id, NewData)})
	}
	const [state, setState] = useState({
		thisForum: dataStore.GetForum(id, NewData)
	});

	return state.thisForum ?
		<Routes>
			<Route path='/' element={<>
				<div className='navDiv'>
					<ForumNavList forum={state.thisForum} />
				</div>
				<div className='content'>
					<TopicNavList forum={state.thisForum} />
				</div>
			</>} />
			<Route path={`${keys.NKey_NavTopic}${keys.RKey_Wildcard}`} element={
				<Route path={keys.RKey_SubId} element={
					<>
						<div className='navDiv'>
							<ForumNavList forum={state.thisForum} />
							<TopicNavList forum={state.thisForum} />
						</div>
						<div className='content'>
							<TopicComponent forum={state.thisForum} />
						</div>
					</>
				} />
			} />
			<Route path={keys.RKey_SubId} element={<ForumComponent />} />
		</Routes> :
		<h1>Loading forum...</h1>
}

export default ForumComponent