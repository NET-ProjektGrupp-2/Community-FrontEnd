import React, { useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { sessionContext } from '../../index';
import { HasRole } from '../../Authentication/Roles';
import styles from '../css/NavContainer.module.css';
import LoggedInNav from './LoggedInNav';
import LoggedOutNav from './LoggedOutNav';

const NavContainer: React.FC<Props> = (props) => {
	const context = useContext(sessionContext);
	return (
		<Navbar className={styles.NavBar}>
			<Container className={styles.NavContainer}>
				<Navbar.Brand>Lexicon Community</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-end">
					<Nav onSelect={props.NavHandler}>
						{
							context.user ? (
								<LoggedInNav DisplayName={context.user.DisplayName} Admin={HasRole(context.user, "Administrator")} />
							) : (
								<LoggedOutNav />
							)
						}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
interface Props {
	// LogedIn: boolean;
	// Admin: undefined | true;
	// UserName: string;
	NavHandler: (eventKey: string | null, e?: React.SyntheticEvent<unknown>) => void;
}

export default NavContainer 