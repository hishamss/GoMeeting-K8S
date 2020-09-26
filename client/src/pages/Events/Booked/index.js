import React, { useState, useEffect } from "react";
import "./style.css";
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { GraphQlAPI } from "../../../API";
const Booked = () => {
  const { user } = useAuth0();
  const [bookedEvents, setBookedEvents] = useState([]);
  let eventDates = []; //array to group the events based on the dates
  let addLine = false; //add <hr> after the first group"
  useEffect(() => {
    fetchBookedEvents();
  }, []);
  const fetchBookedEvents = () => {
    let requestBody = {
      query: `
          query {
            guests(email: "${user.email}"){
                meeting {
                    _id
                    name
                    date
                }
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
        setBookedEvents(res["data"]["guests"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const cancelEvent = (bookingId) => {
    console.log(`Booking Id ${bookingId}`);
    let requestBody = {
      query: `
          mutation {
            deleteGuest(meetingId: "${bookingId}", email: "${user.email}"){
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
        console.log("deleted", res["data"]["deleteGuest"]["deletedCount"]);
        if (res["data"]["deleteGuest"]["deletedCount"] === 1) {
          document.getElementById(bookingId).style.opacity = "0.2";
          document.getElementById(bookingId).style.pointerEvents = "none";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div id="bookedCont" className="text-center">
      <h1 style={{ margin: "1rem" }}>Booked Events</h1>
      <div id="bookedEvents" className="text-left">
        {bookedEvents.length === 0 ? (
          <h3>No Booked Events !</h3>
        ) : (
          (eventDates =
            [] &&
            bookedEvents.map((row) => {
              const dateToFormat = new Date(+row["meeting"].date);
              const eventDate = (dateToFormat + "").substring(0, 15);
              const eventTime = (dateToFormat + "").substring(15);
              if (!eventDates.includes(eventDate)) {
                eventDates.push(eventDate);
                return (
                  <>
                    <hr
                      style={
                        addLine ? { display: "auto" } : { display: "none" }
                      }
                    />
                    {(addLine = true)}
                    <h4>{eventDate}</h4>

                    <div key={row["meeting"]._id} id={row["meeting"]._id}>
                      <h5 style={{ display: "inline" }}>
                        <strong>{row["meeting"].name}</strong>
                      </h5>
                      <Button
                        className="cancelEvent"
                        onClick={() => cancelEvent(row["meeting"]._id)}
                      >
                        Cancel
                      </Button>
                      <p className="eventDate">{eventTime}</p>
                    </div>
                  </>
                );
              }
              return (
                <div key={row["meeting"]._id} id={row["meeting"]._id}>
                  <h5 style={{ display: "inline" }}>
                    <strong>{row["meeting"].name}</strong>
                  </h5>
                  <Button
                    className="cancelEvent"
                    onClick={() => cancelEvent(row["meeting"]._id)}
                  >
                    Cancel
                  </Button>
                  <p className="eventDate">{eventTime}</p>
                </div>
              );
            }))
        )}
      </div>
    </div>
  );
};

export default Booked;
