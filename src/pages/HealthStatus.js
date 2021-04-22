import Calendar from "../calendar/Calendar";
import Tabs from "../components/Tabs";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";

import { withTracking } from 'react-tracker';
import { statusSubmit, statusChange } from '../tracking/events/events'

export let disableVolunteerFlag = false;

function HealthStatus(props) {
  const history = useHistory();

  function handleHealthStatusChange() {
    props.trackHealthStatusChange();
  }

  function handleSubmit(event) {
    if (
      event.target.elements.breathe.checked ||
      event.target.elements.fever.checked ||
      event.target.elements.cold.checked ||
      event.target.elements.sense.checked ||
      event.target.elements.fatigue.checked ||
      event.target.elements.bodyaches.checked
    ) {
      // console.log(volunteerLock);
      props.setVolunteerLock(true);
      alert(
        "Covid Symptoms observed. You are not eligible for volunteering. Account Disable for 14 days"
      );
      // history.push("/login");
      history.push("/locked", { lock: true });
      disableVolunteerFlag = true;
    } else {
      history.push("/edit-volunteer-data");
    }
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
              history.push("/volunteer-dashboard");
            }}
          ></i>
        </div>
      </div>
      <div className="title">
        <h1>Health Status</h1>
      </div>
      <Tabs className="tab-list" selected="availability"></Tabs>

      <div className="body">
        <form onSubmit={handleSubmit}>
          <div>
            <h2>Current Health Conditions</h2>
          </div>
          <br></br>
          <fieldset>
            <div>
              <input
                type="checkbox"
                id="breathe"
                name="breathe"
                className="input-checkbox"
                onClick={handleHealthStatusChange}
              />
              <label htmlFor="breathe">Breathing Issues</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="fever"
                name="fever"
                className="input-checkbox"
                onClick={handleHealthStatusChange}
              />
              <label htmlFor="fever">Fever</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="cold"
                name="cold"
                className="input-checkbox"
                onClick={handleHealthStatusChange}
              />
              <label htmlFor="cold">Cold/Cough</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="sense"
                name="sense"
                className="input-checkbox"
                onClick={handleHealthStatusChange}
              />
              <label htmlFor="sense">Lost sense of smell/taste</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="fatigue"
                name="fatigue"
                className="input-checkbox"
                onClick={handleHealthStatusChange}
              />
              <label htmlFor="fatigue">Fatigue</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="bodyaches"
                name="bodyaches"
                className="input-checkbox"
                onClick={handleHealthStatusChange}
              />
              <label htmlFor="bodyaches">Body Aches</label>
            </div>
          </fieldset>
          <br />
          <br />
          <div align="center">
            <input
              type="submit"
              className="btn-primary btn"
              value="Next"
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
      trackEvent(statusSubmit()),
    
    trackHealthStatusChange: () => 
      trackEvent(statusChange()),

  };
};

const HealthStatusWithTracking = withTracking(mapTrackingToProps)(HealthStatus);

export default HealthStatusWithTracking;
