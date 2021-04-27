import { useHistory } from "react-router";
// import {React} from react;
import React from "react";
import "../styles/App.css";

export default function Tabs(props) {
  const history = useHistory();

  let homeClass = "tab-list-item",
    avaClass = "tab-list-item",
    helpClass = "tab-list-item",
    reqClass = "tab-list-item";
  // const homeClass =
  //   "tab-list-item " + (props.selected === "home") ? "tab-list-active" : "";
  // const avaClass =
  //   "tab-list-item " + (props.selected === "availability")
  //     ? "tab-list-active"
  //     : "";
  // const reqClass =
  //   "tab-list-item " + (props.selected === "requests") ? "tab-list-active" : "";
  // const helpClass =
  //   "tab-list-item " + (props.selected === "help") ? "tab-list-active" : "";

  switch (props.selected) {
    case "home":
      console.log("home");
      homeClass += " tab-list-active";
      break;
    case "requests":
      console.log("requests");
      reqClass += " tab-list-active";
      break;
    case "availability":
      console.log("home");
      avaClass += " tab-list-active";
      break;
    case "help":
      console.log("home");
      helpClass += " tab-list-active";
      break;
    default:
      console.log("home");
      homeClass += " tab-list-active";
  }

  function goHome(e) {
    if (props.selected !== "home") history.push("/");
  }

  function goRequests(e) {
    if (props.selected !== "requests") history.push("/view-volunteer-requests");
  }

  function goAvailability(e) {
    if (props.selected !== "availability") history.push("/volunteer-health");
  }

  function goHelp(e) {
    if (props.selected !== "help") history.push("/info");
  }

  return (
    <>
      <br></br>
      <div align="center" className="tab-list">
        <div className={homeClass} onClick={goHome}>
          Home
        </div>
        <div className={avaClass} onClick={goAvailability}>
          Volunteer
        </div>
        <div
          className={reqClass}
          href="/view-volunteer-requests"
          onClick={goRequests}
        >
          Requests
        </div>
        <div className={helpClass} onClick={goHelp}>
          Help
        </div>
      </div>
    </>
  );
}
