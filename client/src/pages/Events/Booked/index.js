import React, { useState, useEffect } from "react";
import "./style.css";
import { useAuth0 } from "@auth0/auth0-react";
import { GraphQlAPI } from "../../../API";
import Moment from "react-moment";
const Booked = () => {
  const { user } = useAuth0();
  const [bookedEvents, setBookedEvents] = useState([]);
  let eventDates = [];
  let addLine = false;
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
  return (
    <div id="bookedCont" className="text-center">
      <h1 style={{ margin: "1rem" }}>Booked Events</h1>
      <div id="bookedEvents">
        {
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
                    <p key={row["meeting"]._id}>
                      Name:{row["meeting"].name}, time:
                      {eventTime.substring(1, 9)} MST
                    </p>
                  </>
                );
              }
              return (
                <p key={row["meeting"]._id}>
                  Name:{row["meeting"].name}, time:
                  {eventTime.substring(1, 9)} MST
                </p>
              );
            }))
        }
      </div>
    </div>
  );
};

export default Booked;
