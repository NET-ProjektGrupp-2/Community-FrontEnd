import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import { filterData, loadedTopics } from 'App';
import TopicNavList from 'Navigation/components/TopicNavList';
import * as keys from '../../GlobalConst';
import TopicComponent from './TopicComponent';
import { GetLocation, Topic } from 'Data/Topic';
import React from 'react';
import { Forum, GetPath } from 'Data/Forum';

// export const topicContextObject = {
// 	topics: null as Topic[] | null,
// 	activeTopic: (splitPath: string[]) => (NaN),
// 	topicLocation: ""
// };
// export const topicContext = React.createContext(topicContextObject);

function Topics(props: { forum: Forum }) {
	const { forum } = props;
	const topics = filterData(loadedTopics, forum.TopicIds);
	const topicLocation = GetLocation(GetPath(forum));

	// function IsTopic(splitPath: string[]): number {
	// 	let index = splitPath.indexOf("topic");
	// 	index = index === -1 ? NaN : Number(splitPath[index + 1]);
	// 	return index;
	// }

	// const [state] = useState(
	// 	{
	// 		topics: filterData(loadedTopics, forum.TopicIds),
	// 		activeTopic: IsTopic,
	// 		topicLocation: GetLocation(GetPath(forum))
	// 	}
	// );

	// useEffect(() => {
	// 	console.log("Topics loaded");
	// 	return () => {
	// 		console.log("Topics UN-loaded");
	// 	}
	// }, []);

	return (
		<Routes>
			<Route path='/' element={<TopicNavList topics={topics} topicLocation={topicLocation} />} />
			<Route path={`${keys.NKey_NavTopic}${keys.RKey_Wildcard}`} element={
				<Route path={keys.RKey_SubId} element={
					<>
						<TopicNavList topics={topics} topicLocation={topicLocation} />
						<TopicComponent />
					</>
				} />
			} />
		</Routes>
	)
}

export default Topics