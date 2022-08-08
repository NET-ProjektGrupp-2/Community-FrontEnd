import './App.css';
import NavContainer from './Navigation/components/NavContainer';
import RouterContainer from './Navigation/components/RouterContainer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Forum } from './Data/Forum';
import { Topic } from './Data/Topic';
import { Post } from './Data/Post';

export default function App() {
	//const context = useContext(sessionContext);
	// const location = useLocation();
	// const navigate = useNavigate();
	// const linkHandler = (eventKey: string | null, e?: React.SyntheticEvent<unknown>) => {
	// 	if (eventKey) {
	// 		if (eventKey.startsWith("/")) {
	// 			navigate(eventKey, { state: e });
	// 		}
	// 	}
	// };
	return (
		<div className="App">
			<Router >
				<NavContainer/>
				<RouterContainer />
			</Router>
		</div>
	);
}

export const loadedForums: {
	[forumId: number]: Forum
} = {};
export const loadedTopics: {
	[topicId: number]: Topic
} = {};
export const loadedPosts: {
	[postId: number]: Post
} = {};