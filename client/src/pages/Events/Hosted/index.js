import React, { useState, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
const Hosted = () => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const title = useRef("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = () => {
    console.log(title.current.value, date);
    if (title.current.value) handleClose();
  };
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
          <Modal.Title>Host Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                ref={title}
                type="text"
                name="title"
                placeholder="Event Title"
              />
            </Form.Group>
            <Form.Label>Event Date</Form.Label>
            <Form.Group>
              <DatePicker selected={date} onChange={(val) => setDate(val)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button id="closeModalBtn" variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            id="confirmHostingBtn"
            variant="primary"
            onClick={() => handleSubmit()}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Hosted;
