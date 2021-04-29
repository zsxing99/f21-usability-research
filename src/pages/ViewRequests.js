import { useState } from "react";

import { useHistory } from "react-router-dom";
import Calendar from "../calendar/calendar2";
import Tabs from "../components/Tabs";

import "../styles/App.css";

import { withTracking } from 'react-tracker';
import { navigateTo } from "../tracking/events/events";

export let requestFor = "";

function ViewRequests(props) {
  const history = useHistory();
  const [r1status, setR1Status] = useState("Received");
  const [r2status, setR2Status] = useState("Received");

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleListItem(e) {
    if (e == "request1") {
      setR1Status("Done");
    } else {
      setR2Status("Done");
    }
  }

  return (
    <>
      <div className="library-fontello">
        <i
          className="icon-left-open back"
          onClick={() => {
            history.push("/volunteer-dashboard");
          }}
        ></i>
      </div>
      <div class="title">Requests</div>
      <Tabs className="tab-list" selected="requests"></Tabs>
      <div className="body">
        <h2>Requests for Today</h2>
        <div class="requests">
          <div
            class="request-1-head"
            onClick={() => {
              handleListItem("request2");
              requestFor = "Mary";
              history.push("/delivery-request-active");
              props.trackNavigation("ON_DEMAND_REQUEST");
            }}
          >
            <div class="picture mary">
              <img alt="" src="\src\logo_light.png" />
            </div>
            <div class="req-item">
              <div class="request-name">Mary's On-demand Request</div>
              <div class="request-time">6:00 P.M.</div>
            </div>
          </div>
        </div>
        <br />
        <h2>Requests for Thursday</h2>
        <div class="requests">
          <div
            class="request-1-head"
            onClick={() => {
              requestFor = "Mary";
              handleListItem("request1");
              history.push("/delivery-request");
              props.trackNavigation("SUBSCRIPTION_REQUEST");
            }}
          >
            <div class="picture mary"></div>
            <div class="req-item">
              <div class="request-name">Mary's Subscription Request</div>
              <div class="request-time">8:00 P.M.</div>
            </div>
          </div>
        </div>
        <br />
        <h2>Requests for the Week </h2>
        <br />
        {/* </div> */}

        <div align="center"></div>
        {/* <div class="ex1"> */}
        <div className="calendar">
          <Calendar />
        </div>
        {/* </div> */}
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

const ViewRequestsWithTracking = withTracking(mapTrackingToProps)(ViewRequests);

export default ViewRequestsWithTracking;
