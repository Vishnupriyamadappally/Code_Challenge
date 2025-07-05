import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>

            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">ChoiceCart</Navbar.Brand>
                    <Nav className="ms-auto">
                       <Link style={{textDecoration:"none"}} to="/">  <Nav.Link href="#home">Home</Nav.Link> </Link>
                       <Link style={{textDecoration:"none"}} to="/productslist"> <Nav.Link href="#products">Products</Nav.Link> </Link>
                    </Nav>
                </Container>
            </Navbar>

        </div>
    )
}

export default NavBar