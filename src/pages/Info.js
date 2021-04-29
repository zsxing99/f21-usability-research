import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Tabs from "../components/Tabs";
import TitleBar from "../components/TitleBar";

export default function Info() {
  const history = useHistory();
  const lock = true;
  return (
    <>
      {/* <div className="library-fontello">
        <i
          className="icon-left-open back"
          onClick={() => {
            history.goBack();
          }}
        ></i>
      </div>
      <div className="title">
        <h1> Help</h1>
      </div>
      <Tabs className="tab-list" selected="help"></Tabs> */}
      <TitleBar title="Help" selected="help"></TitleBar>
    </>
  );
}
