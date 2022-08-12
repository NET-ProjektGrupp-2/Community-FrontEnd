import React from 'react'
import { Link } from 'react-router-dom'
import styles from 'DebugTestDev.module.css';
import { Topic } from 'Data/Topic';
import { topicContext, topicContextObject } from 'Forum/Component/Topics';
import { useContext } from 'react';

function TopicNavList(props:{linkHandler: (topic: Topic, tContext: typeof topicContextObject) => void}) {
	const context = useContext(topicContext);
	const { activeTopic, topics} = context;
	
	return (
		<div className={styles.navList}>
			<span>Topics</span>
			<ul>
			{topics?.map((topic) => 
				<li><Link className={styles.navLink} 
					key={`topic_${topic.Id}`} 
					to={`topic/${topic.Id}`}>
					{activeTopic ?
						<div>{topic.Title}</div> :
						<div><>Extensive topic description{topic}</></div>}
				</Link></li>
			)}
			</ul>
		</div>
	)
}

export default TopicNavList