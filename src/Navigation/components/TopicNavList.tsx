
import { Link, useLocation, useParams } from 'react-router-dom'
import styles from 'DebugTestDev.module.css';
import { Topic } from 'Data/Topic';
import * as keys from '../../GlobalConst';

function TopicNavList(props:{topics: Topic[] | null, topicLocation: string}) {
	const {topics, topicLocation} = props;
	const {pathname} = useLocation();

	return (
		<div className={styles.navList}>
			<span>Topics</span>
			<ul>
			{topics?.map((topic) => 
				<li><Link className={styles.navLink} 
					key={topic.Id}
					to={`${topicLocation}${topic.Id.toString()}`}>
					{pathname.includes(keys.NKey_NavTopic) ?
					<div>{topic.Title} - small</div> :
					<div>{topic.Title} - Extensive topic description</div>}
				</Link></li>
			)}
			</ul>
		</div>
	)
}

export default TopicNavList
