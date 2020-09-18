import React, { useState, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth0 } from "@auth0/auth0-react";
import { createEvent } from "../../../API";
import "./style.css";
const Hosted = () => {
  const { user } = useAuth0();
  const [show, setShow] = useState(false);
  const [eventDate, setEventDate] = useState(new Date());
  const title = useRef("");
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setEventDate(new Date());
    setShow(true);
  };
  const handleSubmit = () => {
    console.log(eventDate);
    if (title.current.value) {
      let formatEventDate = eventDate
        .toString()
        .match(/(?<=\w{3} ).+.(?= GMT)/)[0];
      let requestBody = {
        query: `
      mutation {
        createMeeting(meetingInput: {
            name: "${title.current.value.trim()}"
            host: "${user.email}"
            date: "${formatEventDate}"
        }){
        _id
        }
      }
      `,
      };
      createEvent(requestBody)
        .then((response) => {
          if (response.status !== 200 && response.status !== 201) {
            throw new Error("smth went wrong!!");
          }
          return response.json();
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      handleClose();
    }
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
              <DatePicker
                selected={eventDate}
                showTimeSelect
                dateFormat="Pp"
                onChange={(date) => setEventDate(date)}
              />
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
