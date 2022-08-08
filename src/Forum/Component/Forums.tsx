
import React, { Component, useContext, useEffect, useState } from 'react'
import { Link, Route, useParams } from 'react-router-dom';
import { sessionContext } from '../..';
import { loadedForums } from '../../App';
import { Forum } from '../../Data/Forum';
import * as keys from '../../GlobalConst'
import Topics from './Topics';



function filterForums(id: string | number | undefined) {
	id = typeof id === 'string' ? parseInt(id) : id;
	let subForums: Forum[] = [];
	for (let key in loadedForums) {
		if (loadedForums[key].ParentForumId === id) {
			subForums.push(loadedForums[key]);
		}
	}
	return subForums.length === 0 ? null : subForums;
}

export default function Forums () {
	const { navState, user } = useContext(sessionContext);
	const {  id } = useParams();
	let forum = id ? loadedForums[parseInt(id)] : null;
	const [state, setState] = useState({
		thisForum: forum,
		subForums: filterForums(id)
	});
	// useEffect(() => {
	// 	if (!forum) {
	// 		// await fetch from server
	// 	}
	// 	let authorized = forum.RestrictedRoleId ?
	// 		(context.user?.RoleIds?.find(id => id === forum.RestrictedRoleId)) ?
	// 			true :
	// 			false :
	// 		true;

	// 	authorized ? (this.setState({ activeForumId: ForumId })) : this.context.navState = keys.AKey_ForumNotAuth;
	// }, [navState]);

	function setActiveForum(ForumId: number) {
		let forum = loadedForums[ForumId];
		setState(prevState => ({...prevState, subForums: null}));
		
	}

	return (
		<div>
		{ state.subForums ?
			<div className='navList'>
				<h3>Forums</h3>
				<ul>
					{state.subForums.map((forum) => <Link to={forum.Id.toString()} onClick={() => setActiveForum(forum.Id)}>{forum.Name}</Link>)}
				</ul>
			</div> :
			<div>no subforum list</div> 
		}
		{ state.thisForum ?
			<Topics />:
			<div>no topics</div> 
		}
			<Route path=':id' element={<Forums />}/>
		</div>
	)
}



// export default class Forums extends Component {
// 	static contextType = sessionContext;

// 	declare context: React.ContextType<typeof sessionContext>;

// 	// constructor(args: any) {
// 	// 	super(args);

// 	// 	this.state = {
// 	// 		activeForumId: 0
// 	// 	};
// 	// }


// 	render(): JSX.Element {
// 		return (
// 			<div>Forums</div>
// 		)
// 	}
// }

