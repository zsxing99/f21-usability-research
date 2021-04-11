import React, { Component } from "react";
import {
  DayPilot,
  DayPilotCalendar,
  DayPilotNavigator,
} from "daypilot-pro-react";
import "./CalendarStyles.css";

const styles = {
  wrap: {
    display: "flex",
    width: "auto",
  },
  left: {
    marginRight: "10px",
  },
  main: {
    flexGrow: "1",
  },
};

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
      },
      // eventDeleteHandling: " ",
      // onEventClick: " ",
      scrollToHour: 20,
    };
  }

  componentDidMount() {
    // load event data
    this.setState({
      startDate: "2021-04-11",
      events: [
        {
          id: 4,
          text: "Mary On-Demand",
          start: "2021-04-11T18:00:00",
          end: "2021-04-11T19:00:00",
          backColor: "#AA767C",
        },
        {
          id: 5,
          text: "Mary Subscription",
          start: "2021-04-13T20:00:00",
          end: "2021-04-13T21:00:00",
          backColor: "#AA767C",
        },
      ],
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
