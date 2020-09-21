import React, { useState, useEffect, useReducer } from "react";
import { Card } from "react-bootstrap";
import { GraphQlAPI } from "../../../API";
import { useAuth0 } from "@auth0/auth0-react";
import Moment from "react-moment";
import "./style.css";
const Home = () => {
  const { user } = useAuth0();
  const [allEvents, setAllEvents] = useState([]);
  useEffect(() => {
    getAllEvents();
  }, []);

  const getAllEvents = () => {
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
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div id="homeCont">
      <div id="allEvents">
        {allEvents.map((row) => {
          if (row.host !== user.email || true) {
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
          }
        })}
      </div>
    </div>
  );
};

export default Home;
