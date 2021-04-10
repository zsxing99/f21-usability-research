import React, { Component } from "react";
import {
  DayPilot,
  DayPilotCalendar,
} from "daypilot-pro-react";
import "./CalendarStyles.css";

const styles = {
  left: {
    marginRight: "10px",
  },
  // main: {
  //   flexGrow: "1",
  // },
};
const eventList = [
  // {
  //   id: 1,
  //   text: "Available",
  //   start: "2020-12-06T10:30:00",
  //   end: "2020-12-06T13:00:00",
  //   backColor: "#AA767C",
  // },
  // {
  //   id: 2,
  //   text: "Available",
  //   start: "2020-12-07T17:30:00",
  //   end: "2020-12-07T19:30:00",
  //   backColor: "#AA767C",
  // },
  // {
  //   id: 3,
  //   text: "Available",
  //   start: "2020-12-09T16:00:00",
  //   end: "2020-12-09T19:00:00",
  //   backColor: "#AA767C",
  // },
];
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
        DayPilot.Modal.prompt("Create a new event:", "Available").then(
          function (modal) {
            dp.clearSelection();
            if (!modal.result) {
              return;
            }
            let eventDesc = {
              id: DayPilot.guid(),
              text: modal.result,
              start: args.start,
              end: args.end,
              backColor: "#AA767C",
            };
            dp.events.add(new DayPilot.Event(eventDesc));
          }
        );
      },
      eventDeleteHandling: "Update",
      onEventClick: (args) => {
        let dp = this.calendar;
        DayPilot.Modal.prompt("Update event text:", args.e.text()).then(
          function (modal) {
            if (!modal.result) {
              return;
            }
            args.e.data.text = modal.result;
            dp.events.update(args.e);
          }
        );
      },
    };
  }

  componentDidMount() {
    // load event data
    this.setState({
      startDate: "2020-12-06",
      events: eventList
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

export default Calendar;
