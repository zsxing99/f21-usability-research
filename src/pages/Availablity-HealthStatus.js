import Calendar from "../calendar/Calendar";
import Tabs from "../components/Tabs";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";

import { withTracking } from 'react-tracker';
import { step } from '../tracking/events/events';

export let disableVolunteerFlag = false;

function AvailablityHealthStatus(props) {
  const history = useHistory();

  function handleHealthStatusChange() {
    props.trackHealthStatusChange();
  }

  function handleSubmit(event) {
    // if (
    //   event.target.elements.breathe.checked ||
    //   event.target.elements.fever.checked ||
    //   event.target.elements.cold.checked ||
    //   event.target.elements.sense.checked ||
    //   event.target.elements.fatigue.checked ||
    //   event.target.elements.bodyaches.checked
    // ) {
    //   // console.log(volunteerLock);
    //   props.setVolunteerLock(true);
    //   alert(
    //     "Covid Symptoms observed. You are not Eligible for Volunteering. Account Disable for 14 days"
    //   );
    //   // history.push("/login");
    //   history.push("/locked", { lock: true });
    //   disableVolunteerFlag = true;
    // } else {
    alert("Data Updated");
    history.push("/volunteer-dashboard");
    // }
    event.preventDefault();

    props.trackAvailabilityHealthStatusUpdate();
  }

  return (
    <>
      <div className="back">
        <div className="library-fontello">
          <i
            className="icon-left-open"
            onClick={() => {
              history.push("/volunteer-health");
            }}
          ></i>
        </div>
      </div>
      <div className="title">
        <h1>Availability </h1>
      </div>
      <Tabs className="tab-list" selected="availability"></Tabs>

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
  trackAvailabilityHealthStatusUpdate: () =>
    trackEvent(step("AVAILABILITY_HEALTH_STATUS", "User elected to update their availability and health status.")),
  
  trackHealthStatusChange: () => 
    trackEvent(step("AVAILABILITY_HEALTH_STATUS", "User elected to change their health status.")),

  };
};

const AvailabilityHealthStatusWithTracking = withTracking(mapTrackingToProps)(AvailablityHealthStatus);

export default AvailabilityHealthStatusWithTracking;
