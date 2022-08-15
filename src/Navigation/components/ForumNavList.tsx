import { filterToplevelForums, Forum, GetPath } from 'Data/Forum'
import React, { useContext } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import styles from 'DebugTestDev.module.css';
import { filterData, loadedForums } from 'App';

function ForumNavList(props:{forumId:number}) {
	const { forumId } = props;
	const parentForum = forumId ? loadedForums[forumId] : null;
	const subForums = parentForum ? filterData(loadedForums, parentForum.SubForumIds) : filterToplevelForums();
	const forumPath = GetPath(parentForum);

	return (
		<div className={styles.navList}>
			<h5>Forums</h5>
			{subForums ?
			<ul>{subForums.map((forum) =>
					<li><Link className={styles.navLink}
						key={forum.Id}
						to={`${forumPath}${forum.Id.toString()}`}>
						{parentForum ?
							<div>{forum.Name}</div> :
							<div>{forum.Name} - Extensive forum description</div>}
					</Link></li>
				)}
			</ul> : 
			<p>Nothing here</p>}
		</div>
	)
}

export default ForumNavList