import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function VolunteerDashboard(props) {
  const history = useHistory();
  const lock = true;
  return (
    <>
      <div
        class="logout"
        onClick={() => {
          history.push("/login");
        }}
      >
        Logout
        {/* <div className="library-fontello">
          <i className="icon-torso"></i>
          <a
            onClick={() => {
              history.push("/login");
            }}
          >
            Logout
          </a>
        </div> */}
      </div>
      <div className="title">Volunteer Dashboard</div>
      <div className="body">
        <div className="volunteer-lock-message">
          <h4>You are not eligible for volunteering.</h4>
        </div>
        <div
          class="volunteer-dashboard-option-locked"
          //   onClick={() => {
          //     history.push("/edit-volunteer-data");
          //   }}
        >
          <div align="center" className="library-fontello">
            <i className="icon-clipboard body-icons volunteer-action-shadow"></i>
          </div>
          <h2 class="volunteer-dashboard-option-text">
            Availability & Health Status
          </h2>
        </div>
        <br />
        <br />
        <div
          class="volunteer-dashboard-option-locked"
          //   onClick={() => {
          //     history.push("/view-volunteer-requests");
          //   }}
        >
          <div align="center" className="library-fontello">
            <i className="icon-basket body-icons"></i>
          </div>
          <h2 class="volunteer-dashboard-option-text-2">Requests</h2>
        </div>
      </div>
    </>
  );
}
