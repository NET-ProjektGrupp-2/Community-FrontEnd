import { filterData, loadedPosts } from 'App';
import { Topic } from 'Data/Topic';
import { useParams } from 'react-router-dom';

function Posts(props:{topic:Topic}) {
	const { topic } = props;
	const { id } = useParams();
	const focus = id ? loadedPosts[parseInt(id)] : null;
	const posts = filterData(loadedPosts, topic.PostIds);

	const originalPost = posts?[0] : null;

	// build the post tree
	return posts ?
		<>
			{posts.map(post =>
				<div className='forumPost' key={"post_" + post.Id}>
					<h4>Author:{post.AuthorId} Postdate:{post.PostDate} Editdate:{post.EditDate}</h4>
					<p>{post.Content}</p>
				</div>
			)}
		</> : <h1>Loading...(not)</h1>
}

export default Posts