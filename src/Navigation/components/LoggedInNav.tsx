import React from 'react'
import { Nav, NavDropdown } from 'react-bootstrap'
import UserIcon from './UserIcon'
import * as keys from '../GlobalConst'

const LoggedInNav :React.FC<Props> = ({Admin, DisplayName}) => (
    <>
        {Admin ?? <Nav.Link href={keys.EKey_ViewUsers}>List of Users</Nav.Link>}
        <NavDropdown title={DisplayName} menuVariant="dark">
            <NavDropdown.Item href={keys.EKey_Account}>My account</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href={keys.EKey_Logout}>Log out</NavDropdown.Item>
        </NavDropdown>
        <UserIcon/> 
    </>
)
interface Props{
    Admin:undefined | true;
    DisplayName:string;
}
export default LoggedInNav 