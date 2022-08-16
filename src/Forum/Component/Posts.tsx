import { filterData, loadedPosts } from 'App';
import { Topic } from 'Data/Topic';
import { useParams } from 'react-router-dom';
import styles from 'DebugTestDev.module.css';

function Posts(props:{topic:Topic, hasFocus: boolean}) {
	const { topic, hasFocus } = props;
	const { id } = useParams();
	const focus = hasFocus && id ? loadedPosts[parseInt(id)] : null;
	const posts = filterData(loadedPosts, topic.PostIds);

	const originalPost = posts?[0] : null;

	// build the post tree
	return posts ?
		<>
			{posts.map(post =>
				<div className={styles.forumPost} key={"post_" + post.Id}>
					<span className={styles.details}>Author:{post.AuthorId} Postdate:{post.PostDate} Editdate:{post.EditDate}</span>
					<p>{post.Content}</p>
				</div>
			)}
		</> : <h1>Loading posts...not</h1>
}

export default Posts