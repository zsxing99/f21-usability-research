import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Tabs from "../components/Tabs";

export default function Info() {
  const history = useHistory();
  const lock = true;
  return (
    <>
      <div className="library-fontello">
        <i
          className="icon-left-open back"
          onClick={() => {
            history.push("/delivery-request-active");
          }}
        ></i>
      </div>
      <div className="title">
        <h1> Help</h1>
      </div>
      <Tabs className="tab-list" selected="help"></Tabs>
    </>
  );
}
