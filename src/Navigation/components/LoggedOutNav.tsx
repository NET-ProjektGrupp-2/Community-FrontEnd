import React from 'react'
import { Nav } from 'react-bootstrap'
import * as keys from '../../GlobalConst'

//<Nav.Link eventKey={keys.EKey_Login}>Sign In</Nav.Link>
//<Nav.Link eventKey={keys.EKey_Register}>Register</Nav.Link>
const LoggedOutNav :React.FC = () => (
    <>
       <Nav.Link eventKey={keys.EKey_NavLogin}>Sign In</Nav.Link>
       <Nav.Link eventKey={keys.EKey_NavRegister}>Register</Nav.Link>
    </>
)

export default LoggedOutNav 