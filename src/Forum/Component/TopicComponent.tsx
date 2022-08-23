import { loadedTopics } from "Data/DataStore";
import { useContext, useEffect, useState } from 'react'
import { Route, Routes, useParams } from 'react-router-dom';
import Posts from './Posts';
import * as keys from 'GlobalConst';
import styles from 'DebugTestDev.module.css';
import { sessionContext } from "App";
import { Forum } from "Data/Forum";

function TopicComponent(props: { forum: Forum }) {
	const { dataStore } = useContext(sessionContext);
	const { forum } = props;
	const id = parseInt(useParams()["id"] ?? "0");
	const NewData = () => {
		setState({thisTopic: dataStore.GetTopic(id, NewData)});
	}
	const [state, setState] = useState({
		thisTopic: dataStore.GetTopic(id, NewData)
	});
	
	return state.thisTopic ?
		<div className={styles.topicContainer}>
			<h1>{state.thisTopic.Title}</h1>
			<span className={styles.details}>Author:{state.thisTopic.AuthorId} Postdate:{state.thisTopic.CreationDate} {state.thisTopic.NewsArticleId}</span>
			<Routes>
				<Route path={keys.RKey_Wildcard} element={<Posts topic={state.thisTopic} hasFocus={false} />} />
				<Route path={`${keys.NKey_NavPost}/${keys.RKey_SubId}`} element={<Posts topic={state.thisTopic} hasFocus={true} />} />
			</Routes>
		</div> :
		<div>
			<h1>Loading topics...not</h1>
		</div>;
}

export default TopicComponent;
