import { Route, Routes, useParams } from 'react-router-dom';
import { filterData, loadedForums, loadedTopics } from 'App';
import * as keys from 'GlobalConst';
import ForumNavList from 'Navigation/components/ForumNavList';
import { GetLocation } from 'Data/Topic';
import { GetPath } from 'Data/Forum';
import TopicNavList from 'Navigation/components/TopicNavList';
import TopicComponent from './TopicComponent';
import styles from 'DebugTestDev.module.css'
import { Container } from 'react-bootstrap';

function ForumComponent() {
	const id = parseInt(useParams()["id"] ?? "0");
	const thisForum = id ? loadedForums[id] : null;
	const topics = filterData(loadedTopics, thisForum?.TopicIds);
	const topicLocation = GetLocation(GetPath(thisForum));

	return thisForum ?
		<Routes>
			<Route path='/' element={<>
				
				<div className={styles.contentWrapper}>

					<div className={styles.forumNavContainer}>
						<ForumNavList forumId={id} />
					</div>
					<div className={styles.content}>
						<TopicNavList topics={topics} topicLocation={topicLocation} />
					</div>
				</div>
			</>} />
			<Route path={`${keys.NKey_NavTopic}${keys.RKey_Wildcard}`} element={
				<Routes>
				<Route path={keys.RKey_SubId} element={
					<>
						
						<div className={styles.contentWrapper}>
							<div className={styles.forumNavContainer}>
								<ForumNavList forumId={id} />
								<TopicNavList topics={topics} topicLocation={topicLocation} />
							</div>
							<div className={styles.content}>
								<TopicComponent />
							</div>
						</div>
					</>
				} />
				</Routes>
			} />
			<Route path={keys.RKey_SubId} element={<ForumComponent />} />
		</Routes> :
		<h1>Loading forums...not</h1>
}

export default ForumComponent