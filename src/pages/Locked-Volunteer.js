import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function VolunteerDashboard(props) {
  const history = useHistory();
  const lock = true;
  return (
    <>
      <div className="title-bar">
        <div className="title">Volunteer Profile Locked</div>
      </div>
      <div align="center" className="body">
        <div align="center" className="volunteer-lock-message">
          Because of your current health status you are not eligible for
          volunteering. Please check back in after 14 days.
        </div>
        <div className="return-home-button">
          <button
            align="center"
            onClick={() => {
              history.push("/");
            }}
          >
            Return Home
          </button>
        </div>
      </div>
    </>
  );
}
