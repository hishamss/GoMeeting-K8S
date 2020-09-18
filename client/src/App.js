import React from "react";
import "./App.css";
import MainNav from "./components/MainNav";
import Landing from "./pages/Landing";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import Hosted from "./pages/Events/Hosted";
import Booked from "./pages/Events/Booked";
import { useAuth0 } from "@auth0/auth0-react";
function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) return <div>Loading....</div>;
  return (
    <>
      <MainNav />
      <Switch>
        {isAuthenticated ? (
          <Redirect from="/" to="/hosted" exact />
        ) : (
          <Redirect from="/" to="/login" exact />
        )}
        {!isAuthenticated && <Route exact path="/login" component={Landing} />}
        {isAuthenticated && <Route exact path="/hosted" component={Hosted} />}
        {isAuthenticated && <Route exact path="/booked" component={Booked} />}
        {isAuthenticated && <Route path="/" component={Hosted} />}
      </Switch>
    </>
  );
}

export default App;
