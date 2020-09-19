import React, { useState, useRef, useEffect } from "react";
import { Button, Modal, Form, Card } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Moment from "react-moment";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth0 } from "@auth0/auth0-react";
import { GraphQlAPI } from "../../../API";
import "./style.css";
const Hosted = () => {
  const { user } = useAuth0();
  const [show, setShow] = useState(false);
  const [eventDate, setEventDate] = useState(new Date());
  const [hostedEvents, setHostedEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const title = useRef("");
  useEffect(() => {
    getHostedEvents();
  }, []);

  const getHostedEvents = () => {
    let requestBody = {
      query: `
    query {
      meetingsPerUser(host: "${user.email}"){
        _id
        name
        host
        date
      }
    }
    `,
    };
    GraphQlAPI(requestBody)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("smth went wrong with loading hosted events");
        }
        return response.json();
      })
      .then((res) => {
        if (res) {
          setHostedEvents(res["data"]["meetingsPerUser"]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClose = () => {
    setShow(false);
    getHostedEvents();
  };
  const handleShow = () => {
    setEventDate(new Date());
    setErrorMessage("");
    setShow(true);
  };
  const handleSubmit = () => {
    console.log(eventDate);
    if (title.current.value) {
      let formatEventDate = eventDate
        .toString()
        .match(/(?<=\w{3} ).+.(?= GMT)/)[0];

      console.log(formatEventDate);
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
      GraphQlAPI(requestBody)
        .then((response) => {
          if (response.status !== 200 && response.status !== 201) {
            setErrorMessage("smth went wrong!!, try Again");
            throw new Error("smth went wrong!!, try Again");
          }
          return response.json();
        })
        .then((res) => {
          if (res) handleClose();
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage("smth went wrong!!, try Again");
        });
    } else {
      setErrorMessage("Event Title is required");
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
          <div id="hostedEvents">
            {hostedEvents.map((row) => {
              const dateToFormat = new Date(+row.date); //convert row.date to number by using unary operator
              return (
                // <p key={row._id}>
                //   name: {row.name}, date:<Moment>{dateToFormat}</Moment>
                // </p>
                <Card className="eventCards" style={{ width: "20rem" }}>
                  <Card.Body>
                    <Card.Title>{row.name}</Card.Title>
                    <Card.Text>
                      <Moment>{dateToFormat}</Moment>
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
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
            <p style={{ color: "red" }}>{errorMessage}</p>
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
