import React, { Component } from "react";
import { DayPilot, DayPilotCalendar } from "daypilot-pro-react";
import "./CalendarStyles.css";

import { withTracking } from "react-tracker";
import {
  availabilityChange,
  availabilityDetailChange,
  availabilityDetailSubmit,
  availabilityDetailCancel,
} from "../tracking/events/events";

const styles = {
  left: {
    marginRight: "10px",
  },
  // main: {
  //   flexGrow: "1",
  // },
};
const eventList = [];
class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: "Days",
      days: 5,
      durationBarVisible: false,
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: (args) => {
        let dp = this.calendar;
        // DayPilot.Modal.prompt("Conform Availability").then(function (modal) {
        //   dp.clearSelection();
        //   let eventDesc = {
        //     id: DayPilot.guid(),
        //     text: "Available",
        //     start: args.start,
        //     end: args.end,
        //     backColor: "#AA767C",
        //   };
        //   dp.events.add(new DayPilot.Event(eventDesc));
        // });

        // DayPilot.Modal.prompt("Conform Availability").then(function (modal) {
        dp.clearSelection();
        let eventDesc = {
          id: DayPilot.guid(),
          text: "Available",
          start: args.start,
          end: args.end,
          backColor: "#AA767C",
        };
        dp.events.add(new DayPilot.Event(eventDesc));

        props.trackAvailabilityChange();
        // });
      },
      eventDeleteHandling: "Update",
      onEventClick: (args) => {
        let dp = this.calendar;
        DayPilot.Modal.prompt("Update event text:", args.e.text()).then(
          function (modal) {
            if (!modal.result) {
              props.trackAvailabilityDetailCancel();

              return;
            }
            args.e.data.text = modal.result;
            dp.events.update(args.e);

            props.trackAvailabilityDetailSubmit();
          }
        );

        props.trackAvailabilityDetailChange();
      },
      scrollToHour: 20,
      // TODO: add tracker for scroll event if possible
    };
  }

  componentDidMount() {
    // load event data
    this.setState({
      startDate: "2020-12-06",
      events: eventList,
    });
  }

  render() {
    var { ...config } = this.state;
    return (
      <div style={styles.wrap}>
        <div style={styles.main}>
          <DayPilotCalendar
            {...config}
            ref={(component) => {
              this.calendar = component && component.control;
            }}
          />
        </div>
      </div>
    );
  }
}

const mapTrackingToProps = (trackEvent) => {
  return {
    trackAvailabilityChange: () => trackEvent(availabilityChange()),

    trackAvailabilityDetailChange: () => trackEvent(availabilityDetailChange()),

    trackAvailabilityDetailSubmit: () => trackEvent(availabilityDetailSubmit()),

    trackAvailabilityDetailCancel: () => trackEvent(availabilityDetailCancel()),
  };
};

const CalendarWithTracking = withTracking(mapTrackingToProps)(Calendar);

export default CalendarWithTracking;
