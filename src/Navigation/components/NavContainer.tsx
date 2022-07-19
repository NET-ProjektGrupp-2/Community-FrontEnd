import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import styles from '../css/NavContainer.module.css';
import LoggedInNav from './LoggedInNav';
import LoggedOutNav from './LoggedOutNav';

const NavContainer :React.FC<Props> = ({Admin,LogedIn, UserName}) => (
  <Navbar className={styles.NavBar}>
      <Container className={styles.NavContainer}>
          <Navbar.Brand>Lexicon Community</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              {
                LogedIn ? (
                  <LoggedInNav UserName={UserName} Admin={Admin}/>
                ):(
                  <LoggedOutNav/>
                )
              }
            </Nav>
          </Navbar.Collapse>
      </Container>
  </Navbar>
)
interface Props{
  LogedIn:boolean;
  Admin:undefined | true;
  UserName:string;
}

export default NavContainer 