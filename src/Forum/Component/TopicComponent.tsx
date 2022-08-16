import { loadedTopics } from 'App';
import { useEffect } from 'react'
import { Route, Routes, useParams } from 'react-router-dom';
import Posts from './Posts';
import * as keys from 'GlobalConst';
import styles from 'DebugTestDev.module.css';

function TopicComponent() {
	const { id } = useParams();
	const thisTopic = id ? loadedTopics[parseInt(id)] : null;

	useEffect(() => {
		console.log(`Topic id#${id} loaded`);
	}, []);

	return thisTopic ?
		<div className={styles.topicContainer}>
			<h1>{thisTopic.Title}</h1>
			<span className={styles.details}>Author:{thisTopic.AuthorId} Postdate:{thisTopic.CreationDate} {thisTopic.NewsArticleId}</span>
			<Routes>
				<Route path={keys.RKey_Wildcard} element={<Posts topic={thisTopic} hasFocus={false} />} />
				<Route path={`${keys.NKey_NavPost}/${keys.RKey_SubId}`} element={<Posts topic={thisTopic} hasFocus={true} />} />
			</Routes>
		</div> :
		<div>
			<h1>Loading topics...not</h1>
		</div>;
}

export default TopicComponent;
