import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";
import { useState } from 'react';
import { tasks } from '../utils/usabilityTasks';
import { makeStyles } from '@material-ui/core/styles';
import {
  Fab,
} from '@material-ui/core';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';
import Modal from 'react-modal';
import { withTracking } from 'react-tracker';
import { taskDescriptionButtonClick } from '../tracking/events/events';

const useStyles = makeStyles((theme) => ({
  bottomRight: {
    backgroundColor: "#00acc1 !important",
    border: "0px !important",
    position: "fixed",
    bottom: theme.spacing(1.5),
    right: theme.spacing(17),
  },
}));

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    transform             : 'translate(-50%, -50%)',
    maxHeight             : '90vh',
    maxWidth              : '90%',
    overflowY             : 'auto',
  }
};

var defaultThemeColors = Survey
  .StylesManager
  .ThemeColors["default"];
defaultThemeColors["$main-color"] = "#00acc1 !important";
defaultThemeColors["$body-container-background-color"] = "#f0f9fa !important";

const tasksHtml = () => {
  var html = '';
  tasks.forEach(t => {
    html += `
      <b>${t.title}</b>
      <br/><br/>
      <u>Scenario:</u> ${t.scenario}
      <br/><br/>
      <u>Task:</u> ${t.description}
      <br/><br/>
    `
  })
  return html;
}

const taskInfoJSON = {
  title: `Task Descriptions`,
  startSurveyText: `Go Back`,
  pages: [
    {
      questions: [
        {
          type: "html",
          html: tasksHtml()
        }
      ]
    }
  ]
}

function TestMenu(props) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    props.trackTaskDescriptionButtonClick();
    setIsOpen(true);
  };
  const onComplete = () => setIsOpen(false);

  var survey = (
    <Survey.Survey
        json={taskInfoJSON}
        showCompletedPage={false}
        onComplete={onComplete}
        completeText="Return"
      />
  );

  var surveyRender = (
    <Modal
      isOpen={isOpen}
      style={customStyles}
    >
      {survey}
    </Modal>
  );

  return(
    <div>
      <Fab size="small" className={classes.bottomRight} onClick={onClick}>
        ?
      </Fab>
      {surveyRender}
    </div>
  )
}

const mapTrackingToProps = trackEvent => {
  return {
    trackTaskDescriptionButtonClick: () => 
      trackEvent(taskDescriptionButtonClick())
  }
};

const TestMenuWithTracking = withTracking(mapTrackingToProps)(TestMenu);

export default TestMenuWithTracking;

