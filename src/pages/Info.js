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
      <div class="body faq">
        <h2> About BenevoleBuddy</h2>
        <div>
          BenevoleBuddy allows volunteers to help out individuals in need to get
          essentials. The app helps volunteers deliver essential supplies to
          people who cannot leave their homes.
        </div>
        <br></br>
        <h2>On-demand Request</h2>
        <div>
          This is a one-time request where the user requests a set of items for
          a one-time delivery. The items can be groceries or medicines. The
          volunteer can access the information of a request in the 'Requests'
          tab. Volunteers can chat with the person being helped via the chat
          feature in the request and discuss availability of items. Once
          volunteers are done shopping and delivering, they can mark the request
          as 'Done'.
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
