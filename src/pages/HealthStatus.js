import Calendar from "../calendar/Calendar";
import Tabs from "../components/Tabs";
import TitleBar from "../components/TitleBar";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";

import { withTracking } from 'react-tracker';
import { statusSubmit, statusChange } from '../tracking/events/events'

export let disableVolunteerFlag = false;

function HealthStatus(props) {
  const history = useHistory();
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [nota, setNota] = useState(false);
  const [breathe, setBreathe] = useState(false);
  const [fever, setFever] = useState(false);
  const [cold, setCold] = useState(false);
  const [sense, setSense] = useState(false);
  const [fatigue, setFatigue] = useState(false);
  const [bodyaches, setBodyaches] = useState(false);

  function handleHealthStatusChange() {
    props.trackHealthStatusChange();
  }

  function handleSubmit(event) {
    // if nothing is checked
    if (
      !event.target.elements.breathe.checked &&
      !event.target.elements.fever.checked &&
      !event.target.elements.cold.checked &&
      !event.target.elements.sense.checked &&
      !event.target.elements.fatigue.checked &&
      !event.target.elements.bodyaches.checked &&
      !event.target.elements.nota.checked
    ) {
      alert("Please check atleast one option");
    } else if (
      event.target.elements.breathe.checked ||
      event.target.elements.fever.checked ||
      event.target.elements.cold.checked ||
      event.target.elements.sense.checked ||
      event.target.elements.fatigue.checked ||
      event.target.elements.bodyaches.checked
    ) {
      if (event.target.elements.nota.checked) {
        alert("Invalid selection");
      } else {
        alert(
          "Covid Symptoms observed. You are not eligible for volunteering. Account Disable for 14 days"
        );
        history.push("/locked", { lock: true });
        disableVolunteerFlag = true;
      }
    } else {
      history.push("/edit-volunteer-data");
    }
    event.preventDefault();

    props.trackAvailabilityHealthStatusUpdate();
  }

  function submitDisabled(event) {
    // console.log(event);
    // event.preventDefault();
    // if (event.target.checked) {
    //   setDisableSubmit(false);
    // }
    setDisableSubmit(false);
  }

  function handleCheckbox(event) {
    // event.preventDefault();
    // const target = event.target;
    // console.log(target);
    // const value = target.type === "checkbox" ? target.checked : target.value;
    // console.log(event.target.id);
    // const targetId = event.target.id;
    // switch (targetId) {
    //   case "nota":
    //     setNota(nota === true ? false : true);
    //     break;
    //   case "breathe":
    //     setBreathe(breathe === true ? false : true);
    //     break;
    //   case "sense":
    //     setSense(sense === true ? false : true);
    //     break;
    //   case "fatigue":
    //     setFatigue(fatigue === true ? false : true);
    //     break;
    //   case "cold":
    //     setCold(cold === true ? false : true);
    //     break;
    //   case "fever":
    //     setFever(fever === true ? false : true);
    //     break;
    //   case "bodyaches":
    //     setBodyaches(bodyaches === true ? false : true);
    //     break;
    // }
    // if (bodyaches || fever || cold || sense || fatigue || breathe || nota) {
    //   setDisableSubmit(false);
    // }
  }

  return (
    <>
      {/* <div className="back">
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
        <h1>Volunteer</h1>
      </div>
      <Tabs className="tab-list" selected="availability"></Tabs> */}
      <TitleBar title="Volunteer" selected="availability" />

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
                disabled={nota}
                // onChange={handleCheckbox}
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
                // onChange={handleCheckbox}
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
                // onChange={handleCheckbox}
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
                // onChange={handleCheckbox}
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
                // onChange={handleCheckbox}
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
                // onChange={handleCheckbox}
                className="input-checkbox"
                onClick={handleHealthStatusChange}
              />
              <label htmlFor="bodyaches">Body Aches</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="nota"
                name="nota"
                className="input-checkbox"
                // onChange={handleCheckbox}
                // checked={nota ? true : false}
              />
              <label htmlFor="nota">None of the Above</label>
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
