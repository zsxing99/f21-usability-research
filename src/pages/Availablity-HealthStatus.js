import Calendar from "../calendar/Calendar";
import Tabs from "../components/Tabs";
import TitleBar from "../components/TitleBar";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";

import { withTracking } from 'react-tracker';
import { availabilitySubmit } from "../tracking/events/events";

export let disableVolunteerFlag = false;

function AvailablityHealthStatus(props) {
  const history = useHistory();

  function handleSubmit(event) {
    alert("Data Updated");
    history.push("/volunteer-dashboard");

    event.preventDefault();

    props.trackAvailabilitySubmit();
  }

  return (
    <>
      {/* <div className="back">
        <div className="library-fontello">
          <i
            className="icon-left-open"
            onClick={() => {
              history.push("/volunteer-health");
            }}
          ></i>
        </div>
      </div> */}
      {/* <div className="title">
        <h1>Availability </h1>
      </div> */}
      <TitleBar title="Volunteer" selected="availability" />
      {/* <Tabs className="tab-list" selected="availability"></Tabs> */}

      <div className="body">
        <form onSubmit={handleSubmit}>
          <div>
            <h2>Availability</h2>
          </div>
          <br />
          <div className="calendar">
            <Calendar />
          </div>
          <br />
          <div align="center">
            <input
              type="submit"
              className="btn-primary btn"
              value="Update"
            ></input>
          </div>
        </form>
      </div>
    </>
  );
}

const mapTrackingToProps = trackEvent => {
  return {
    trackAvailabilitySubmit: () =>
      trackEvent(availabilitySubmit()),
  
  };
};

const AvailabilityHealthStatusWithTracking = withTracking(mapTrackingToProps)(AvailablityHealthStatus);

export default AvailabilityHealthStatusWithTracking;
