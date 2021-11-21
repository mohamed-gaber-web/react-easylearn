import React, { useContext, useEffect, useState } from 'react'
import './navbar.component.css';

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import AuthService from '../../services/auth.service';
import { useHistory, Link } from 'react-router-dom';

import { UserContext } from '../../App';

export function NavbarTop() {

    let authService = new AuthService();
    const [userLoggedIn, setUserLoggedIn] = useState();
    let history = useHistory();

    const user = useContext(UserContext);

    const userAuth = localStorage.getItem('userAuth');
    useEffect(() => {
        const userToken = JSON.parse(localStorage.getItem('user'));
        const access_token = localStorage.getItem('access_token');
        if ( userToken && access_token) {
            console.log('with render component', authService.isLoggedIn())
            setUserLoggedIn(true)
        }

        return () => {
            console.log('clean up', authService.isLoggedIn())
        }
    }, [])


    const logOut = () => {
        localStorage.clear();
        setUserLoggedIn(false);
        history.push('/login');
    }



    return (
        <div>
            <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">KHRS APP</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link className="nav-bar" to="/">All Courses</Link>
                    <Link className="nav-bar" to="/my-courses">My Courses</Link>

                    {
                         userAuth
                         ? 
                         <NavDropdown  title={ user ? user.firstname : null} id="basic-nav-dropdown">
                         <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                         <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                         <NavDropdown.Item onClick={ logOut }>Logout</NavDropdown.Item>
                        </NavDropdown>
                         : 
                         <Nav>
                            <Link className="nav-bar" to="/login">Login</Link>
                        </Nav>
          
             

                    }
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </div>
    )
}

