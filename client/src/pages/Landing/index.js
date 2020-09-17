import React from "react";
import { Button } from "react-bootstrap";
import "./style.css";
const Landing = () => {
  return (
    <div id="landingCont">
      <div id="landingDiv" className="text-center">
        <img
          src="/meetTogother.png"
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
          <Button
            style={{
              backgroundColor: "#e83151",
              borderColor: "#e83151",
              fontSize: "1.7rem",
            }}
          >
            Join GoMeeting
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
