import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

class Navigation extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navbar variant="light">
          <Navbar.Brand>Video Renting</Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="/movies">
              Movies
            </Nav.Link>
            <Nav.Link as={Link} to="/customers">
              Customers
            </Nav.Link>
            <Nav.Link as={Link} to="/rentals">
              Rentals
            </Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
