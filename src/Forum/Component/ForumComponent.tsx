import { useContext } from 'react'
import { Route, Routes, useParams } from 'react-router-dom';
import { loadedForums } from 'App';
import Topics from './Topics';
import * as keys from 'GlobalConst';
import ForumNavList from 'Navigation/components/ForumNavList';

function ForumComponent() {
	const id = parseInt(useParams()["id"]??"0");
	const thisForum = id ? loadedForums[id] : null;

	return thisForum ?
		<Routes>
			<Route path={keys.RKey_Wildcard} element={
			<>
				<ForumNavList forumId={id}/>
				<Topics forum={thisForum}/>
			</>} />
			<Route path={keys.RKey_SubId} element={<ForumComponent />} />
		</Routes> :
		<h1>Loading...</h1>
}

export default ForumComponent