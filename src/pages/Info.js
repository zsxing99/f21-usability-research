import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Tabs from "../components/Tabs";
import TitleBar from "../components/TitleBar";

export default function Info() {
  const history = useHistory();
  const lock = true;
  return (
    <>
      <TitleBar title="Help" selected="help"></TitleBar>
      <div className="body">
        <h2>Subscription Request vs. On-demand Request</h2>
        <h3>Subscription Request</h3>
        <div>
          A subscription request is a weekly/monthly request where the users put
          in their weekly items and the volunteers reach out before starting to
          shop to see if the user wants any items changed in the subscription
          list.
        </div>
        <br></br>
        <h3>On-demand Request</h3>
        <div>
          This is a one-time request where the user requests a set of items for
          a one-time delivery. <br></br>The only difference between the two
          requests is that the subscription request requires you to send a
          confirmation message to the user before you begin processing their
          order.
        </div>
        <br></br>
        <h2>Volunteer Availability</h2>
        <div>
          You can add your availability by clicking on the 'Volunteer' tab. You
          will have to take the health status survey before you can fill in your
          availability. If the you have any symptoms for COVID-19, you will not
          be able to vilunteer for the next 14 days.
        </div>
      </div>
    </>
  );
}
