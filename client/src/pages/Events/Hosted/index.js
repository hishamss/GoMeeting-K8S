import React, { useState, useRef } from "react";
import { Button, Modal, Form, Card } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Moment from "react-moment";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { GraphQlAPI } from "../../../API";
import "./style.css";
const Hosted = () => {
  const { user } = useAuth0();
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [guests, setGuests] = useState([]);
  const [eventDate, setEventDate] = useState(new Date());
  const endDate = new Date(new Date().setDate(new Date().getDate() + 14));
  const allEvents = useSelector((state) => state.eventsReducer);
  const [errorMessage, setErrorMessage] = useState("");
  const title = useRef("");
  const handleCloseModal1 = () => {
    setShowModal1(false);
  };

  const handleCloseModal2 = () => {
    setShowModal2(false);
  };
  const handleShowModal1 = () => {
    setEventDate(new Date());
    setErrorMessage("");
    setShowModal1(true);
  };

  const handleCardClick = (guestsArr) => {
    setGuests(guestsArr);
    handleShowModal2();
  };

  const handleShowModal2 = () => {
    setShowModal2(true);
  };
  const handleSubmit = () => {
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
      GraphQlAPI(requestBody)
        .then((response) => {
          if (response.status !== 200 && response.status !== 201) {
            setErrorMessage("smth went wrong!!, try Again");
            throw new Error("smth went wrong!!, try Again");
          }
          return response.json();
        })
        .then((res) => {
          if (res) {
            if ("errors" in res)
              setErrorMessage("You already hosting an Event on this date&time");
            else {
              //update the hosted events array when add event modal close to update the list on the page.
              allEvents.push({
                name: title.current.value.trim(),
                host: user.email,
                date: new Date(eventDate).getTime(),
                _id: res["data"]["createMeeting"]["_id"],
              });
              handleCloseModal1();
            }
          }
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage("smth went wrong!!, try Again");
        });
    } else {
      setErrorMessage("Event Title is required");
    }
  };

  const cancelEvent = (EventId) => {
    console.log("event to cancel", EventId);
    let requestBody = {
      query: `
    mutation {
      deleteMeeting(meetingId: "${EventId}"){
        deletedCount
      }
    }
    `,
    };
    GraphQlAPI(requestBody)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("smth went wrong!!, try Again");
        }
        return response.json();
      })
      .then((res) => {
        if (res["data"]["deleteMeeting"]["deletedCount"] === 1) {
          document.getElementById(EventId).style.opacity = "0.3";
          document.getElementById(EventId).style.pointerEvents = "none";
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <div id="hostedCont">
        <div id="hostEventDiv">
          <Button id="hostBtn" onClick={() => handleShowModal1()}>
            Host Event
          </Button>
        </div>
        <div id="listHostedEventsDiv">
          <div id="hostedEvents">
            {allEvents
              .filter((event) => event.host === user.email)
              .map((row) => {
                const dateToFormat = new Date(+row.date); //convert row.date to number by using unary operator
                return (
                  <Card
                    className="eventCards"
                    style={{ width: "20rem" }}
                    key={row._id}
                    id={row._id}
                  >
                    <Card.Body>
                      <Card.Title className="cardTitle">{row.name}</Card.Title>
                      <Card.Text className="cardText">
                        <Moment>{dateToFormat}</Moment>
                        <br />
                        <br />
                        <Button
                          className="HostedEventBtn"
                          onClick={() => handleCardClick(row.guests)}
                        >
                          Show Guests
                        </Button>

                        <Button
                          className="HostedEventBtn"
                          onClick={() => cancelEvent(row._id)}
                          style={{ marginLeft: "0.5rem" }}
                        >
                          Cancel
                        </Button>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
          </div>
        </div>
      </div>
      <Modal show={showModal1} onHide={handleCloseModal1}>
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
                autoComplete="off"
              />
            </Form.Group>
            <Form.Label>Event Date</Form.Label>

            <Form.Group>
              <DatePicker
                selected={eventDate}
                showTimeSelect
                dateFormat="Pp"
                minDate={new Date()}
                maxDate={endDate}
                onChange={(date) => setEventDate(date)}
              />
            </Form.Group>
            <p style={{ color: "red" }}>{errorMessage}</p>
            <p style={{ color: "grey", fontSize: ".7rem" }}>
              Hint: maximum event date is 14 days ahead
            </p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            id="closeModalBtn"
            variant="secondary"
            onClick={handleCloseModal1}
          >
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
      <Modal show={showModal2} onHide={handleCloseModal2}>
        <Modal.Header closeButton>
          <Modal.Title>Guests</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{guests.length} Guests</p>
          <ul>
            {guests.map((row, index) => {
              return <li key={index}>{row.email}</li>;
            })}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Hosted;
