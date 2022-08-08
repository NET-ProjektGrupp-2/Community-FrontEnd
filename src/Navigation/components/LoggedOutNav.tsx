import React from 'react'
import {Link} from 'react-router-dom'
import * as keys from '../../GlobalConst'

//<Nav.Link eventKey={keys.EKey_Login}>Sign In</Nav.Link>
//<Nav.Link eventKey={keys.EKey_Register}>Register</Nav.Link>
const LoggedOutNav: React.FC = () => (
	<>
		<Link to={keys.EKey_NavLogin}>Sign In</Link>
		<Link to={keys.EKey_NavRegister}>Register</Link>
	</>
);

export default LoggedOutNav 