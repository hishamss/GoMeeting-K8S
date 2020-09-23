import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { GraphQlAPI } from "../../../API";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllEvents } from "../../../actions";
import { useDispatch } from "react-redux";
import Moment from "react-moment";
import "./style.css";
const Home = () => {
  const { user } = useAuth0();
  const [allEvents, setAllEvents] = useState([]);
  useEffect(() => {
    fetchEvents();
  }, []);
  const dispatch = useDispatch();
  const fetchEvents = () => {
    let requestBody = {
      query: `
    query {
      meetings{
        _id
        name
        host
        date
        guests{
          email
        }
      }
    }
    `,
    };
    GraphQlAPI(requestBody)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("smth went wrong with loading all events");
        }
        return response.json();
      })
      .then((res) => {
        if (res) {
          setAllEvents(res["data"]["meetings"]);
          dispatch(getAllEvents(res["data"]["meetings"]));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div id="homeCont" className="text-center">
      <h1 style={{ margin: "1rem" }}>Available Events</h1>
      <div id="allEvents">
        {allEvents
          .filter((event) => event.host !== user.email)
          .map((row) => {
            const dateToFormat = new Date(+row.date); //convert row.date to number by using unary operator
            return (
              <Card
                className="eventCards"
                style={{ width: "20rem" }}
                key={row._id}
              >
                <Card.Body>
                  <Card.Title className="cardTitle">{row.name}</Card.Title>
                  <Card.Text className="cardText">
                    <Moment>{dateToFormat}</Moment>
                  </Card.Text>
                </Card.Body>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
