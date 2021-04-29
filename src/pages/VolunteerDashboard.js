import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles/App.css";
import Tabs from "../components/Tabs";
import TitleBar from "../components/TitleBar";

import { withTracking } from 'react-tracker';
import {
  navigateTo
} from "../tracking/events/events";

function VolunteerDashboard(props) {
  const history = useHistory();
  return (
    <>
      <TitleBar title="Dashboard" selected="home" isHome="true" />
      <div className="body">
        {props.lock ? (
          <div> You are locked out!</div>
        ) : (
          <div
            class="volunteer-dashboard-option"
            onClick={() => {
              history.push("/volunteer-health");
              props.trackNavigation("AVAILABILITY_HEALTH_STATUS");
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
        <div
          class="volunteer-dashboard-option"
          onClick={() => {
            history.push("/view-volunteer-requests");

            props.trackNavigation("REQUESTS");
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

const mapTrackingToProps = trackEvent => {
  return {
    trackNavigation: (pageName) =>
      trackEvent(navigateTo(pageName)),
  }
}

const VolunteerDashboardWithTracking = withTracking(mapTrackingToProps)(VolunteerDashboard);

export default VolunteerDashboardWithTracking;