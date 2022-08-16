
import React from 'react'
import { Form } from 'react-bootstrap';
import {Link, useLocation} from 'react-router-dom'
import * as keys from '../../GlobalConst'

const Login = () => {
	
	const {state} = useLocation();

	if (state) {
		
	}
	
	return (
		<>
			<Form >
				
			</Form>
			<Link to={keys.EKey_SubmitLogin}>Sign In</Link>
			<Link to={keys.NKey_NavRegister}>Register</Link>
		</>
	)
}

export default Login 