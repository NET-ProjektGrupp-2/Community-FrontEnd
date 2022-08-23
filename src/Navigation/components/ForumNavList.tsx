import { Forum, GetPath } from 'Data/Forum'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from 'DebugTestDev.module.css';
import { loadedForums } from "Data/DataStore";
import * as keys from 'GlobalConst';
import { sessionContext } from 'App';

function ForumNavList(props: { forum?: Forum }) {
	const { dataStore } = useContext(sessionContext);
	const { forum: thisForum } = props;
	const NewData = () => {
		setState({ forums: dataStore.GetForums(thisForum, NewData, request).Item});
	};

	const request = dataStore.GetForums(thisForum, NewData);
	const [state, setState] = useState({
		forums: request.Item
	})
	let { forums } = state;
	
	const parentForum = thisForum?.ParentForumId ? loadedForums.get(thisForum.ParentForumId) : null;
	const forumPath = GetPath(thisForum);

	const linkRender = (forum: Forum) => (
		<li><Link className={styles.navLink}
			key={forum.Id}
			to={`${forumPath}${forum.Id.toString()}`}>
			{thisForum ?
				<div>{forum.Name}</div> :
				<div>{forum.Name} - Extensive forum description</div>
			}
		</Link></li>
	);

	return (
		<div className={styles.navList}>
			<h5>Forums</h5>
			{forums || thisForum ?
				<ul>{thisForum ? (parentForum ? 
					(<li><Link className={styles.navLink}
						to={GetPath(parentForum)}>
						<div>Back to {parentForum.Name}</div>
					</Link></li>)
					:
					(<li><Link className={styles.navLink}
						to={keys.NKey_NavForum}>
						<div>Forum index</div>
					</Link></li>)
					) : null}
					{forums?.map(linkRender)}
				</ul> :
				<p>Nothing here</p>}
		</div>
	)
}

export default ForumNavList