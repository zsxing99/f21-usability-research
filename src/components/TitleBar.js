import { useHistory } from "react-router";
// import {React} from react;
import React from "react";
import Tabs from "../components/Tabs";

import { withTracking } from 'react-tracker';
import { navigateBack } from '../tracking/events/events';

import "../styles/App.css";

function TitleBar(props) {
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
                props.trackBackNavigation();
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

const mapTrackingToProps = trackEvent => {
  return {
    trackBackNavigation: () =>
      trackEvent(navigateBack()),
  }
};

const TitleBarWithTracking = withTracking(mapTrackingToProps)(TitleBar);

export default TitleBarWithTracking;
