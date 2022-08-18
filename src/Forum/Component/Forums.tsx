import React, { useEffect, useState } from 'react'
import { filterData, loadedForums } from 'App';
import { Forum, GetPath } from 'Data/Forum';
import ForumNavList from 'Navigation/components/ForumNavList';
import ForumComponent from './ForumComponent';
import { Route, Routes, useLocation } from 'react-router-dom';
import * as keys from 'GlobalConst';
import { LocationTracker, TrackLocation } from 'Navigation/components/LoadingResponse';
import styles from 'DebugTestDev.module.css';

// export const forumContextObject = {
// 	topForums: [] as Forum[],
// 	activeForum: (splitPath: string[]) => (NaN),
// 	forumPath: ""
// };
// export const forumContext = React.createContext(forumContextObject);

export default function Forums() {

	// const { pathname } = useLocation();
	// let activeForum = function () {
	// 	let id = IsForum(pathname.split('/'));
	// 	return isNaN(id) ? null : loadedForums[id];
	// }();

	// function IsForum(splitPath: string[]): number {
	// 	let index = splitPath.indexOf("topic");
	// 	index = index === -1 ? splitPath.length - 1 : index - 1;
	// 	return Number(splitPath[index]);
	// }

	// const [state] = useState({
	// 	topForums: filterToplevelForums(),
	// 	activeForum: IsForum,
	// 	forumPath: GetPath(activeForum)
	// });

	// const setActiveForum = (forum: Forum | null) => {
	// 	setstate({
	// 		topForums: filterToplevelForums(),
	// 		activeForum: forum,
	// 		forumPath: GetPath(forum),
	// 		subForums: filterData(loadedForums, forum?.SubForumIds)
	// 	});
	// }

	// useEffect(() => {
	// 	let trackLocation: TrackLocation;
	// 	trackLocation = {
	// 		Path: keys.NKey_NavForum,
	// 		Match(path, prevPath, splitPath) {
	// 			let index = splitPath.indexOf("topic");
	// 			index = index === -1 ? splitPath.length - 1 : index - 1;
	// 			let forumId = Number(splitPath[index]);
	// 			if (isNaN(forumId)) {
	// 				setActiveForum(null);
	// 			}
	// 			else if (state.activeForum?.Id !== forumId) {
	// 				try {
	// 					setActiveForum(loadedForums[forumId]);
	// 				} catch (error) {
	// 					return "That forum does not exist."
	// 				}
	// 			}
	// 		}
	// 	};
	// 	LocationTracker.addLocation(trackLocation);

	// 	return () => {
	// 		LocationTracker.removeLocation(trackLocation)
	// 	}
	// }, []);

	return (
		//<forumContext.Provider value={state}>
			<Routes>
				<Route path="/" element={<>
				<div className={styles.contentWrapperNoFlex}>
					<ForumNavList forumId={0}/>
				</div>
				</>} />
				<Route path={keys.RKey_SubId} element={<ForumComponent />} />
			</Routes>
		//</forumContext.Provider>
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
