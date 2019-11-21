import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

class Navigation extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <div>
        <Navbar bg="light" variant="light">
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
            {!user ? (
              <React.Fragment>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/logout">
                  Logout
                </Nav.Link>
              </React.Fragment>
            )}
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
