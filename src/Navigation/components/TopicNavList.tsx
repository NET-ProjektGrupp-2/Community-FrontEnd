
import { Link, useLocation, useParams } from 'react-router-dom'
import styles from 'DebugTestDev.module.css';
import { Topic } from 'Data/Topic';

function TopicNavList(props:{topics: Topic[] | null, topicLocation: string}) {
	const {topics, topicLocation} = props;
	const id = Number(useParams()["id"]);

	return (
		<div className={styles.navList}>
			<span>Topics</span>
			<ul>
			{topics?.map((topic) => 
				<li><Link className={styles.navLink} 
					key={topic.Id}
					to={`${topicLocation}${topic.Id.toString()}`}>
					{isNaN(id) ?
						<div>{topic.Title} - Extensive topic description</div> :
						<div>{topic.Title} - small</div> }
				</Link></li>
			)}
			</ul>
		</div>
	)
}

export default TopicNavList
