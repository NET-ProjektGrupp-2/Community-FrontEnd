import { useContext } from 'react'
import { Route, useParams } from 'react-router-dom';
import { loadedForums } from 'App';
import Topics from './Topics';
import * as keys from 'GlobalConst';
import { forumContext } from './Forums';

function ForumComponent() {
	const context = useContext(forumContext);
	const { id } = useParams();
	const thisForum = id ? loadedForums[parseInt(id)] : null;


	return thisForum ?
		<>
			<Route path={keys.RKey_Wildcard} element={
				<Topics />
			} />
			{thisForum.SubForumIds ?
				<Route path={keys.RKey_SubId} element={<ForumComponent />} /> : 
				null}
		</> :
		<>	{context.subForums ?
				<Route path={keys.RKey_SubId} element={<ForumComponent />} /> :
				null}
		</>
}

export default ForumComponent