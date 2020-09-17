import React from "react";
import { Navbar, NavDropdown } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
const MainNav = () => {
  const { logout, isAuthenticated, user } = useAuth0();
  return (
    <Navbar id="nav_container" bg="light" expand="lg">
      <Navbar.Brand href="#home">
        <img id="logo_img" alt="Logo" src="goMeeting.png" />
      </Navbar.Brand>
      {/* ml-auto to align Nav to the right */}
      {isAuthenticated && (
        <NavDropdown className="ml-auto" title="Menu" id="basic-nav-dropdown">
          <NavDropdown.Item href="#" role="button">
            {user.email}
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#" role="button" onClick={() => logout()}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      )}
    </Navbar>
  );
};

export default MainNav;
