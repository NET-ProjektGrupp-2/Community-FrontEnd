import React from 'react'
import { Nav } from 'react-bootstrap'

const LoggedOutNav :React.FC = () => (
    <>
       <Nav.Link>Sign In</Nav.Link>
       <Nav.Link>Register</Nav.Link>
    </>
)

export default LoggedOutNav 