import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./style.css";
const Hosted = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div id="hostedCont">
        <div id="hostEventDiv">
          <Button id="hostBtn" onClick={() => handleShow()}>
            Host Event
          </Button>
        </div>
        <div id="listHostedEventsDiv">
          <div id="hostedEvents"></div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Hosted;
