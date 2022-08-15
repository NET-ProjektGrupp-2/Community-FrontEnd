import { loadedTopics } from 'App';
import { useEffect } from 'react'
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import Posts from './Posts';
import * as keys from 'GlobalConst';

function TopicComponent() {
	const { id } = useParams();
	const thisTopic = id ? loadedTopics[parseInt(id)] : null;
	const location = useLocation();

	useEffect(() => {
		console.log(`Topic id#${id} loaded`);
	}, []);

	return thisTopic ?
		<div className='topicContainer'>
			<h1>{thisTopic.Title}</h1>
			<span className='details'>{thisTopic.AuthorId}{thisTopic.CreationDate}{thisTopic.NewsArticleId}</span>
			<Routes>
				<Route path='/' element={<Posts topic={thisTopic}/>} />
				<Route path={`${keys.NKey_NavPost}/${keys.RKey_SubId}`} element={<Posts topic={thisTopic}/>} />
			</Routes>
		</div> :
		<div>
			<h1>Loading...</h1>
		</div>;
}

export default TopicComponent;
