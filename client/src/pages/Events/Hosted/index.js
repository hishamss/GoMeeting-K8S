import React from "react";
import { Button } from "react-bootstrap";
import "./style.css";
const Hosted = () => {
  return (
    <div id="hostedCont">
      <div id="hostEventDiv">
        <Button id="hostBtn">Host Event</Button>
      </div>
      <div id="listHostedEventsDiv">
        <div id="hostedEvents"></div>
      </div>
    </div>
  );
};

export default Hosted;
