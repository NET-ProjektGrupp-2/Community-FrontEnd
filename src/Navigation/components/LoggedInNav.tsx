import React from 'react'
import {Link} from 'react-router-dom'
import {NavDropdown } from 'react-bootstrap'
import UserIcon from './UserIcon'
import * as keys from '../../GlobalConst'

const LoggedInNav :React.FC<Props> = ({Admin, DisplayName}) => (
    <>
        {Admin ?? <Link to={keys.NKey_NavViewUsers}>List of Users</Link>}
        <NavDropdown title={DisplayName} menuVariant="dark">
            <NavDropdown.Item>
				<Link to={keys.NKey_NavAccount}>My account</Link>
			</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item>
				<Link to={keys.NKey_NavLogout}>Log out</Link>
			</NavDropdown.Item>
        </NavDropdown>
        <UserIcon/>
    </>
)
interface Props{
    Admin:undefined | true;
    DisplayName:string;
}
export default LoggedInNav 