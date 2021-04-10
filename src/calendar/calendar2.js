import React, { Component } from 'react';
import {
  DayPilot,
  DayPilotCalendar,
  DayPilotNavigator,
} from 'daypilot-pro-react';
import './CalendarStyles.css';

const styles = {
  wrap: {
    display: 'flex',
  },
  left: {
    marginRight: '10px',
  },
  main: {
    flexGrow: '1',
  },
};

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: 'Days',
      days: 5,
      durationBarVisible: false,
      timeRangeSelectedHandling: 'Enabled',
      onTimeRangeSelected: (args) => {
        let dp = this.calendar;
      },
      eventDeleteHandling: ' ',
      onEventClick: ' ',
    };
  }

  componentDidMount() {
    // load event data
    this.setState({
      startDate: '2020-12-06',
      events: [
        {
          id: 4,
          text: 'Mary On-Demand',
          start: '2020-12-09T18:00:00',
          end: '2020-12-09T19:00:00',
          backColor: '#AA767C',
        },
        {
          id: 5,
          text: 'Mary Subscription',
          start: '2020-12-10T20:00:00',
          end: '2020-12-10T21:00:00',
          backColor: '#AA767C',
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
