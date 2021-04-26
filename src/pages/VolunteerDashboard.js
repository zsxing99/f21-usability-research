import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles/App.css";
import Tabs from "../components/Tabs";
import TitleBar from "../components/TitleBar";

export default function VolunteerDashboard(props) {
  const history = useHistory();
  return (
    <>
      {/* <div
        class="logout"
        onClick={() => {
          history.push("/login");
        }}
      >
        Logout
      </div> */}
      {/* <div className="title">Volunteer Dashboard</div> */}
      <TitleBar title="Dashboard" selected="home" isHome="true" />
      {/* <Tabs className="tab-list" selected="home"></Tabs> */}
      <div className="body">
        {props.lock ? (
          <div> You are locked out!</div>
        ) : (
          <div
            class="volunteer-dashboard-option"
            onClick={() => {
              history.push("/edit-volunteer-data");
            }}
          >
            <div align="center" className="library-fontello">
              <i className="icon-clipboard body-icons volunteer-action-shadow"></i>
            </div>
            <h2 align="center" class="volunteer-dashboard-option-text">
              Volunteer
            </h2>
          </div>
        )}
        <br />
        <br />
        <div
          class="volunteer-dashboard-option"
          onClick={() => {
            history.push("/view-volunteer-requests");
          }}
        >
          <div align="center" className="library-fontello">
            <i className="icon-basket body-icons"></i>
          </div>
          <h2 align="center" class="volunteer-dashboard-option-text-2">
            Requests
          </h2>
        </div>
      </div>
    </>
  );
}
