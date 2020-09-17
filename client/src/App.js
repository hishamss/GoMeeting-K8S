import React from "react";
import "./App.css";
import MainNav from "./components/MainNav";
import Landing from "./pages/Landing";
import { useAuth0 } from "@auth0/auth0-react";
function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) return <div>Loading....</div>;
  return (
    <>
      <MainNav />
      {!isAuthenticated && <Landing />}
    </>
  );
}

export default App;
