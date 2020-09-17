import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
const MainNav = () => {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    isLoading,
  } = useAuth0();
  return (
    <Navbar id="nav_container" bg="light" expand="lg">
      <Navbar.Brand href="#home">
        <img id="logo_img" src="goMeeting.png" />
      </Navbar.Brand>
      {/* ml-auto to align Nav to the right */}
      <Nav className="ml-auto">
        {isAuthenticated && <p>{user.email}</p>}
        {isAuthenticated && <button onClick={() => logout()}>Logout</button>}
      </Nav>
    </Navbar>
  );
};

export default MainNav;
