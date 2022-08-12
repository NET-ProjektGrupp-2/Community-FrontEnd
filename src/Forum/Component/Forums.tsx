import React, { useEffect, useState } from 'react'
import { filterData, loadedForums } from 'App';
import { Forum, GetPath } from 'Data/Forum';
import ForumNavList from 'Navigation/components/ForumNavList';
import ForumComponent from './ForumComponent';
import { Route, useLocation } from 'react-router-dom';
import * as keys from 'GlobalConst';
import { LocationTracker, TrackLocation } from 'Navigation/components/LoadingResponse';

function filterToplevelForums() {
	let result: Forum[] = [];
	for (let id in loadedForums) {
		if (!loadedForums[id].ParentForumId) {
			result.push(loadedForums[id]);
		}
	}
	return result;
}
export const forumContextObject = {
	topForums: filterToplevelForums(),
	activeForum: null as Forum | null,
	forumPath: "",
	subForums: null as Forum[] | null
};
export const forumContext = React.createContext(forumContextObject);

export default function Forums() {
	const [state, setState] = useState(forumContextObject);

	const setActiveForum = (forum: Forum | null) => {
		setState({
			...state,
			activeForum: forum,
			forumPath: GetPath(forum),
			subForums: filterData(loadedForums, forum?.SubForumIds)
		});
	}

	useEffect(() => {
		let trackLocation: TrackLocation;
		trackLocation = {
			Path: keys.EKey_NavForum,
			Match(path, prevPath, splitPath) {
				let index = splitPath.indexOf("topic");
				index = index === -1 ? splitPath.length - 1 : index;
				let forumId = Number(splitPath[index]);
				if(isNaN(forumId)) {
					setActiveForum(null);
				}
				if (state.activeForum?.Id !== forumId) {
					try {
						setActiveForum(loadedForums[forumId]);
					} catch (error) {
						return "That forum does not exist."
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
		<forumContext.Provider value={state}>
			<ForumNavList forumNavHandler={setActiveForum} />
			<Route path={keys.RKey_SubId} element={
				<ForumComponent />} />
		</forumContext.Provider>
	);
}

	// useEffect(() => {
	// 	if (!forum) {
	// 		// await fetch from server
	// 	}
	// 	let authorized = forum.RestrictedRoleId ?
	// 		(context.user?.RoleIds?.find(id => id === forum.RestrictedRoleId)) ?
	// 			true :
	// 			false :
	// 		true;

	// 	authorized ? (this.setState({ activeForumId: ForumId })) : this.context.navState = keys.AKey_ForumNotAuth;
	// }, [navState]);
