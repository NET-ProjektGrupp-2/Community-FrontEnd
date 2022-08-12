import { useContext, useEffect, useState } from 'react'
import { Route, useParams } from 'react-router-dom';
import { filterData, loadedPosts, loadedTopics } from 'App';
import Posts from './Posts';
import TopicNavList from 'Navigation/components/TopicNavList';
import * as keys from '../../GlobalConst';
import TopicComponent from './TopicComponent';
import { Topic } from 'Data/Topic';
import { LocationTracker, TrackLocation } from 'Navigation/components/LoadingResponse';
import React from 'react';
import { forumContext } from './Forums';

export const topicContextObject = {
	activeTopic: null as Topic | null,
	topics: null as Topic[] | null
};
export const topicContext = React.createContext(topicContextObject);

function Topics() {
	const context = useContext(forumContext);
	const [state, setState] = useState(topicContextObject);
	
	const setActiveTopic = (topic: Topic | null) => {
		setState({
			...state,
			activeTopic: topic
		});
	}

	useEffect(() => {
		
		let trackLocation: TrackLocation;
		trackLocation = {
			Path: keys.EKey_NavTopic,
			Match(path, prevPath, splitPath) {
				let index = splitPath.indexOf("post");
				index = index === -1 ? splitPath.length - 1 : index;
				let topicId = Number(splitPath[index]);
				if(isNaN(topicId)) {
					setActiveTopic(null);
				}
				if (state.activeTopic?.Id !== topicId) {
					try {
						setActiveTopic(loadedTopics[topicId]);
					} catch (error) {
						return "That topic does not exist."
					}
				}
			}
		};
		LocationTracker.addLocation(trackLocation);

		return () => {
			LocationTracker.removeLocation(trackLocation)
		}
	}, []);

	return (
		<topicContext.Provider value={state}><>
			<TopicNavList linkHandler={setActiveTopic} />
			<Route path={`${keys.EKey_NavTopic}/${keys.RKey_SubId}`} element />
		</></topicContext.Provider>
	)
}

export default Topics