import React from 'react'
import { Nav, NavDropdown } from 'react-bootstrap'
import UserIcon from './UserIcon'

const LoggedInNav :React.FC<Props> = ({Admin, UserName}) => (
    <>
        {Admin ?? <Nav.Link>List of Users</Nav.Link>}
        <NavDropdown title={UserName} menuVariant="dark">
            <NavDropdown.Item>My account</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item>Log out</NavDropdown.Item>
        </NavDropdown>
        <UserIcon/> 
    </>
)
interface Props{
    Admin:undefined | true;
    UserName:string;
}
export default LoggedInNav 