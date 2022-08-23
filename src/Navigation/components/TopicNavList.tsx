
import { Link, useLocation } from 'react-router-dom'
import styles from 'DebugTestDev.module.css';
import { GetLocation, Topic } from 'Data/Topic';
import * as keys from 'GlobalConst';
import ChronologicalList from 'Data/ChronologicalList';
import { useContext, useState } from 'react';
import { Forum, GetPath } from 'Data/Forum';
import { sessionContext } from 'App';

function TopicNavList(props: { forum: Forum }) {

	const { dataStore } = useContext(sessionContext);
	const { forum } = props;

	const NewData = () => {
		setState({ page: page, topics: dataStore.GetForumTopics(forum, NewData, request).Item });
	};
	const topicLocation = GetLocation(GetPath(forum));
	const { pathname } = useLocation();
	const request = dataStore.GetForumTopics(forum, NewData);
	const [state, setState] = useState({
		page: 0,
		topics: request.Item
	});
	let { page, topics } = state;

	// set up event listener for changes to the topics list to clear cache and rerender
	const cachedPages = new Array<JSX.Element[]>();
	const mapLinks = (topics: ChronologicalList<Topic>) => {
		if (cachedPages[page]) {
			return cachedPages[page];
		}
		let linkArray = new Array<JSX.Element>();
		if (topics.Map(linkRender, page, linkArray)) {
			cachedPages[page] = linkArray;
			return linkArray;
		}
		return null;
	}
	const linkRender = (topic: Topic) => (
		<li><Link className={styles.navLink}
			key={topic.Id}
			to={`${topicLocation}${topic.Id.toString()}`}>
			{pathname.includes(keys.NKey_NavTopic) ?
				<div>{topic.Title} - small</div> :
				<div>{topic.Title} - Extensive topic description</div>}
		</Link></li>
	);

	return (
		<div className={styles.navList}>
			<span>Topics</span>
			{topics ?
				<ul>
					{page > 0 ?
						<li><button onClick={() => setState({ ...state, page: (page - 1) })}>Previous</button>
						</li> : null}
					{mapLinks(topics)}
					{forum.PageCount() > (page + 1) ?
						<li><button onClick={() => setState({ ...state, page: (page + 1) })}>Next</button></li> : null}
				</ul> :
				<p>Nothing here</p>}
		</div>
	);
}

export default TopicNavList
