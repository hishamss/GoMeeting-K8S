import React from "react";
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import "./style.css";
const Landing = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div id="landingCont">
      <div id="landingDiv" className="text-center">
        <img
          src="/meetTogother.png"
          alt="Login-img"
          width="400"
          height="300"
          style={{ opacity: "0.75" }}
        />

        <div id="landingU" className="text-center">
          <h1>Let's get together.</h1>
          <h1>Share our thoughts.</h1>
        </div>
        <br />
        <div id="landingD" className="text-center">
          <Button id="joinGoMeeting" onClick={() => loginWithRedirect()}>
            Join GoMeeting
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
