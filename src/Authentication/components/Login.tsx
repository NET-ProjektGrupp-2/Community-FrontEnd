
import React from 'react'
import Nav from 'react-bootstrap/esm/Nav'
import * as keys from '../../GlobalConst'

const Login: React.FC<Props> = ({ State }) => {

	if (State && (State instanceof React.SyntheticEvent<Element, Event>)) {
		
	}
	
	return (
		// render a login form or run EKey_SubmitLogin if state contains credentials (from a pop-up login (?) or from a saved session)
		<>
			<h1>Login</h1>
			<Nav.Link eventKey={keys.EKey_NavLogin}>Sign In</Nav.Link>
			<Nav.Link eventKey={keys.EKey_NavRegister}>Register</Nav.Link>
		</>
	)
}

interface Props {
	State?: unknown
}
export default Login 