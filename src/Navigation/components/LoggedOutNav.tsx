import React from 'react'
import {Link} from 'react-router-dom'
import * as keys from '../../GlobalConst'

//<Nav.Link eventKey={keys.EKey_Login}>Sign In</Nav.Link>
//<Nav.Link eventKey={keys.EKey_Register}>Register</Nav.Link>
const LoggedOutNav: React.FC = () => (
	<>
		<Link to={keys.NKey_NavLogin}>Sign In</Link>
		<Link to={keys.NKey_NavRegister}>Register</Link>
	</>
);

export default LoggedOutNav 