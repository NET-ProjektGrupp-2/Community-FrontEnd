import React from 'react'
import { Nav, NavDropdown } from 'react-bootstrap'
import UserIcon from './UserIcon'
import * as keys from '../../GlobalConst'

const LoggedInNav :React.FC<Props> = ({Admin, DisplayName}) => (
    <>
        {Admin ?? <Nav.Link eventKey={keys.EKey_NavViewUsers}>List of Users</Nav.Link>}
        <NavDropdown title={DisplayName} menuVariant="dark">
            <NavDropdown.Item eventKey={keys.EKey_NavAccount}>My account</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item eventKey={keys.EKey_NavLogout}>Log out</NavDropdown.Item>
        </NavDropdown>
        <UserIcon/> 
    </>
)
interface Props{
    Admin:undefined | true;
    DisplayName:string;
}
export default LoggedInNav 