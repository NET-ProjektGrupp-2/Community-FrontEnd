import './App.css';
import NavContainer from './Navigation/components/NavContainer';
import RouterContainer from './Navigation/components/RouterContainer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Forum } from './Data/Forum';
import { Topic } from './Data/Topic';
import { Post } from './Data/Post';

export const loadedForums: {
	[forumId: number]: Forum
} = {} as const;
export const loadedTopics: {
	[topicId: number]: Topic
} = {} as const;
export const loadedPosts: {
	[postId: number]: Post
} = {} as const;

export default function App() {

	loadedForums[1] = { Id: 1, Name: "First", Description: "first", SubForumIds: [2] };
	loadedForums[2] = { Id: 2, Name: "Second", Description: "second", TopicIds: [1, 2, 3], ParentForumId: 1, SubForumIds: [3] };
	loadedForums[3] = { Id: 3, Name: "Third", Description: "third", ParentForumId: 2 };

	loadedTopics[1] = { Id: 1, Title: "First", CreationDate: Date.now(), AuthorId: "system", ForumId: 2 };
	loadedTopics[2] = { Id: 2, Title: "Second", CreationDate: Date.now(), AuthorId: "system", ForumId: 2 };
	loadedTopics[3] = { Id: 3, Title: "Third", CreationDate: Date.now(), AuthorId: "system", ForumId: 2 };

	loadedPosts[1] = { Id: 1, PostDate: Date.now(), AuthorId: "system", Replies: [2, 3], TopicId: 2, Content: "Lorem ipsum" };
	loadedPosts[2] = { Id: 2, PostDate: Date.now(), AuthorId: "system", ContextPostId: 1, TopicId: 2, Content: "Dolor" };
	loadedPosts[3] = { Id: 3, PostDate: Date.now(), AuthorId: "system", ContextPostId: 2, TopicId: 2, Content: "Ichi, ni, san" };

	return (
		<div className="App">
			<Router >
				<NavContainer />
				<RouterContainer />
			</Router>
		</div>
	);
}

export function filterData<T = {}>(source: { [id: number]: T }, ids: number[] | null | undefined) {
	if (!ids) {
		return null;
	}
	let result = [] as T[];
	ids.forEach(id => {
		let x = source[id] as T;
		result.push(x);
	});
	return result.length === 0 ? null : result;
}
