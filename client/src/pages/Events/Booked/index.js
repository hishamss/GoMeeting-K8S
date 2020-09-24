import React, { useState, useEffect } from "react";
import "./style.css";
import { useAuth0 } from "@auth0/auth0-react";
import { GraphQlAPI } from "../../../API";
import Moment from "react-moment";
const Booked = () => {
  const { user } = useAuth0();
  const [bookedEvents, setBookedEvents] = useState([]);
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
        console.log("booked Events", res["data"]["guests"]);
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
        {bookedEvents.map((row) => {
          console.log(row["meeting"]);
          const dateToFormat = new Date(+row["meeting"].date);
          return (
            <p key={row["meeting"]._id}>
              Name:{row["meeting"].name}, date: <Moment>{dateToFormat}</Moment>
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Booked;
