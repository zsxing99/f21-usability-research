import { useHistory } from "react-router";
// import {React} from react;
import React from "react";
import Tabs from "../components/Tabs";
import "../styles/App.css";

export default function TitleBar(props) {
  const history = useHistory();

  const title = props.title;
  const selected = props.selected;
  const isHome = props.isHome ? true : false;
  const backPage = props.backPage ? props.backPage : null;
  return (
    <div className="title-bar">
      {!isHome ? (
        <div className="back">
          <div className="library-fontello">
            <i
              className="icon-left-open"
              onClick={() => {
                if (backPage === null) history.goBack();
                else history.push(backPage);
              }}
            ></i>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="title-text" align="center">
        {title}
      </div>

      <Tabs className="tab-list" selected={selected}></Tabs>
    </div>
  );
}
