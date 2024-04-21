import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './navigation.css'; 

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm custom-navbar">
      <Navbar.Brand as={Link} to="/users/create" className=" custom-brand">Create User</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/users/view" className="text-dark custom-link">View All Users</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
