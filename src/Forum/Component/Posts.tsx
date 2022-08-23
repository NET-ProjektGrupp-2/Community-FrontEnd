
import { filterData, loadedPosts } from "Data/DataStore";
import { Topic } from 'Data/Topic';
import { Link, useParams } from 'react-router-dom';
import styles from 'DebugTestDev.module.css';
import { sessionContext } from "App";
import { useContext, useState } from "react";
import ChronologicalList from "Data/ChronologicalList";
import { Post } from "Data/Post";

function Posts(props: { topic: Topic, hasFocus: boolean }) {
	const { dataStore } = useContext(sessionContext);
	const { topic, hasFocus } = props;
	const { id } = useParams();

	const NewData = () => {
		request.Sequence = state.page;
		setState({ page: page, posts: dataStore.GetTopicPosts(topic, NewData, request).Item });
	}
	const request = dataStore.GetTopicPosts(topic, NewData);

	const [state, setState] = useState({
		page: 0,
		posts: request.Item
	});
	let { page, posts } = state;
	const focus = hasFocus && id ? loadedPosts.get(parseInt(id)) : undefined;
	const originalPost = posts ? [0] : null;

	const mapPosts = (posts: ChronologicalList<Post>) => {
		let postArray = new Array<JSX.Element>();
		if (posts.Map(postRender, page, postArray)) {
			return postArray;
		}
		return null;
	};
	const postRender = (post: Post) => (
		<div className={styles.forumPost} key={"post_" + post.Id}>
			<span className={styles.details}>Author:{post.AuthorId} Postdate:{post.PostDate} Editdate:{post.EditDate}</span>
			<p>{post.Content}</p>
		</div>
	);
	// build the post tree
	// wrap each individual post in a PostComponent
	return posts ?
		<>
			<div>
				{page > 0 ?
					<button onClick={() => setState({ ...state, page: (page - 1) })}>Previous page</button> : 
					null}
				{topic.PageCount() > (page + 1) ?
					<button onClick={() => setState({ ...state, page: (page + 1) })}>Next page</button> : 
					null}
			</div>
			{mapPosts(posts)}
			<div>
				{page > 0 ?
					<button onClick={() => setState({ ...state, page: (page - 1) })}>Previous page</button> : 
					null}
				{topic.PageCount() > (page + 1) ?
					<button onClick={() => setState({ ...state, page: (page + 1) })}>Next page</button> : 
					null}
			</div>
		</> : <h1>Loading posts...not</h1>
}

export default Posts