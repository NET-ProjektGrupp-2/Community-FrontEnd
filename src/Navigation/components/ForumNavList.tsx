import { filterToplevelForums, Forum, GetPath } from 'Data/Forum'
import React, { useContext } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import styles from 'DebugTestDev.module.css';
import { filterData, loadedForums } from 'App';
import * as keys from '../../GlobalConst';

function ForumNavList(props: { forumId: number }) {
	const { forumId } = props;
	const thisForum = forumId ? loadedForums[forumId] : null;
	const subForums = thisForum ? filterData(loadedForums, thisForum.SubForumIds) : filterToplevelForums();
	const parentForum = thisForum?.ParentForumId? loadedForums[thisForum.ParentForumId] : null;
	const forumPath = GetPath(thisForum);


	return (
		<div className={styles.navList}>
			<h5>Forums</h5>
			{subForums || thisForum ?
				<ul>{thisForum ? (parentForum ? (
					<li><Link className={styles.navLink}
						to={GetPath(parentForum)}>
						<div>Back to {parentForum.Name}</div>
					</Link></li>) :
					<li><Link className={styles.navLink}
						to={keys.NKey_NavForum}>
						<div>Forum index</div>
					</Link></li>) :
					null}
					{subForums?.map((forum) =>
						<li><Link className={styles.navLink}
							key={forum.Id}
							to={`${forumPath}${forum.Id.toString()}`}>
							{thisForum ?
								<div>{forum.Name}</div> :
								<div>{forum.Name} - Extensive forum description</div>
							}
						</Link></li>
					)}
				</ul> :
				<p>Nothing here</p>}
		</div>
	)
}

export default ForumNavList