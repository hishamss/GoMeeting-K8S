import React from "react";
import { Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
const MainNav = () => {
  const { logout, isAuthenticated, user } = useAuth0();
  return (
    <Navbar className="sticky-top" id="nav_container" bg="light" expand="lg">
      <Navbar.Brand>
        <img id="logo_img" alt="Logo" src="goMeeting.png" />
      </Navbar.Brand>
      {/* ml-auto to align Nav to the right */}
      {isAuthenticated && (
        <NavDropdown className="ml-auto" title="Menu" id="basic-nav-dropdown">
          <NavDropdown.Item href="#" role="button">
            {user.email}
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item as={NavLink} to="/home" key="1">
            Home
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/hosted" key="2">
            Hosted Events
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/booked" key="3">
            Booked Events
          </NavDropdown.Item>
          <NavDropdown.Item href="#" role="button" onClick={() => logout()}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      )}
    </Navbar>
  );
};

export default MainNav;
