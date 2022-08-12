import { Forum } from 'Data/Forum'
import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from 'DebugTestDev.module.css';
import { forumContextObject, forumContext } from 'Forum/Component/Forums';

function ForumNavList(props: { forumNavHandler: (forum: Forum, context: typeof forumContextObject) => void }) {
	const context = useContext(forumContext);
	const { activeForum, forumPath, subForums} = context;

	return (
		<div className={styles.navList}>
			<h5>Forums</h5>
			<ul>{subForums ? 
				subForums.map((forum) =>
					<li><Link className={styles.navLink}
						key={forum.Id}
						to={`${forumPath}${forum.Id.toString()}`}>
						{activeForum ?
							<div>{forum.Name}</div> :
							<div>Extensive forum description</div>}
					</Link></li>
				): null }
			</ul>
			
		</div>
	)
}

export default ForumNavList