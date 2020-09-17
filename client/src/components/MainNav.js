import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";
const MainNav = () => {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    isLoading,
  } = useAuth0();
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      {/* ml-auto to align Nav to the right */}
      <Nav className="ml-auto">
        {isAuthenticated ? (
          <button onClick={() => logout()}>Logout</button>
        ) : (
          <button onClick={() => loginWithRedirect()}>Login</button>
        )}
      </Nav>
    </Navbar>
  );
};

export default MainNav;
