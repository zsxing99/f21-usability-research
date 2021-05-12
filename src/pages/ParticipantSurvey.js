import React, { useEffect } from 'react';
import { useState } from 'react';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';
import Modal from 'react-modal';
import { sendResult } from '../utils/usabilityResult'; 
import { getTaskGroup, getTask } from '../utils/usabilityTasks';

const TASK_NUM = 5;

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

const init = {
  title: `Welcome to BenevolveBuddy Usability Study`,
  startSurveyText: "Begin",
  firstPageIsStarted: true,
  pages: [
    {
      questions: [
        {
          type: "html",
          html: `
            You are going to participate in a usability study for BenevolveBuddy application.
            We are studying how machine learning can be leveraged to infer the usability of 
            an application. You can help us by participating in a usability testing activity.
            It will take only a few minutes. 
            <br/><br/>
            You will be using an app meant for volunteers interested in helping out individuals in need.  Volunteers can deliver essentials to people who cannot get out of their homes. You will go through the activity  by performing 5 tasks After each task, you will take a short survey.
            <br/><br/>
            Please click on <b>Begin</b> button when you are ready.
            `
        }
      ],
    },
    {
      questions: [
        {
          name: "gender",
          type: "radiogroup",
          title: "Please select your gender:",
          isRequired: true,
          choices: [
            {
              value: "M",
              text: "Male"
            },
            {
              value: "F",
              text: "Female"
            },
            {
              value: "NB",
              text: "Non-binary"
            },
            {
              value: "NA",
              text: "Prefer not to disclose"
            }
          ]
        },
        {
          name: "age",
          type: "radiogroup",
          title: "Please select your age group:",
          isRequired: true,
          choices: [
            {
              value: 0,
              text: "Under 18"
            },
            {
              value: 18,
              text: "18 to 24"
            },
            {
              value: 25,
              text: "25 to 39"
            },
            {
              value: 40,
              text: "40 to 59"
            },
            {
              value: 60,
              text: "Over 60"
            }
          ]
        },
        {
          name: "consent",
          type: "checkbox",
          title: "Participation in this usability study is voluntary. All information will \
                  remain strictly confidential. Interactions made with the application \
                  during the test will be recorded. However, at no time will your name or \
                  any other identification be used.",
          isRequired: true,
          hasNone: false,
          choices: [
            "I have read and understood the above information."
          ]
        }
      ]
    }
  ],
};

const beginTask = (taskId) => {
  const taskGroup = localStorage.getItem('taskGroup');
  const task = getTask(taskGroup, taskId);
  return {
    title: `Task ${taskId} out of 5`,
    description: `${task.title}`,
    questions: [
      {
        type: "html",
        html: `
          You are about begin task ${taskId} of the usability study.
          <br/><br/>
          ${task.description}
          <br/><br/>
          Please click on <b>Complete</b> button when you are ready to start the task.
        `
      }
    ]
  }
};

const usabilityChoices = [
    {
      value: 1,
      text: "Strongly Disagree"
    }, {
      value: 2,
      text: "Disagree"
    }, {
      value: 3,
      text: "Indifferent"
    }, {
      value: 4,
      text: "Agree"
    }, {
      value: 5,
      text: "Strongly Agree"
    }
];

const finishTask = (taskId) => {
  return {
    title: `Task ${taskId}`,
    description: `Usability Survey Questions`,
    questions: [
      {
        type: "dropdown",
        name: "efficiency-1",
        title: "I was able to complete this task quickly.",
        choices: usabilityChoices,
        isRequired: true,
      },
      {
        type: "dropdown",
        name: "efficiency-2",
        title: "I was able to complete the task with a reasonable number of steps.",
        choices: usabilityChoices,
        isRequired: true,
      },
      {
        type: "dropdown",
        name: "effectiveness-1",
        title: "I was able to use the system without written instructions.",
        choices: usabilityChoices,
        isRequired: true,
      },
      {
        type: "dropdown",
        name: "effectiveness-2",
        title: "I was able to perform this task successfully.",
        choices: usabilityChoices,
        isRequired: true,
      },
      {
        type: "dropdown",
        name: "satisfaction-1",
        title: "It was pleasant to use the system to perform this task.",
        choices: usabilityChoices,
        isRequired: true,
      },
      {
        type: "dropdown",
        name: "satisfaction-2",
        title: "The system worked the way I wanted it to work.",
        choices: usabilityChoices,
        isRequired: true,
      },
    ]
  }
};

const done = {
  title: "Finish Up BenevolveBuddy Usability Study",
  description: "Thank you for participating!",
  showQuestionNumbers: "off",
  questions: [
    {
      name: "comment",
      type: "comment",
      title: "Please provide any additional comments you would like to share. If you would \
              like to be contacted in the future with the study results, please leave \
              your e-mail address."
    }
  ]
}
export default function ParticipantSurvey(props) {
  const [isVisible, setIsVisible] = useState(JSON.parse(localStorage.getItem('taskComplete')));
  const [taskId, setTaskId] = useState(JSON.parse(localStorage.getItem('taskId')));
  const [isDone, setIsDone] = useState(false);
  
  function onCompleteInit(result) {
    var demographics = {
      "age": result.data.age,
      "gender": result.data.gender
    };

    // Begin the usability test process, starting from task 1
    localStorage.setItem('demographics', JSON.stringify(demographics));
    localStorage.setItem('taskGroup', getTaskGroup());
    localStorage.setItem('taskId', 1);
    localStorage.setItem('taskComplete', false);
    localStorage.setItem('taskInProgress', false);
    setTaskId(1);
  }

  function onCompleteBeginTask(result) {
    // Begin Task
    localStorage.setItem('taskInProgress', true);

    var events = [];
    localStorage.setItem('events', JSON.stringify(events));

    setIsVisible(false);
  }

  function onCompleteFinishTask(result) {
    // Store collected events
    var events = JSON.parse(localStorage.getItem('events'));
    localStorage.setItem(`task${taskId}_events`, JSON.stringify(events));

    // Reset events array
    events = [];
    localStorage.setItem('events', JSON.stringify(events));

    // Store collected survey results
    var surveyResults = [];
    for (let k in result.data) {
      surveyResults.push(result.data[k]);
    }
    localStorage.setItem(`task${taskId}_surveyResults`, JSON.stringify(surveyResults));
    
    localStorage.setItem('taskInProgress', false);    
    if (taskId < TASK_NUM) {
      localStorage.setItem('taskId', taskId + 1);
      localStorage.setItem('taskComplete', false);
      setTaskId(taskId + 1);
    } else {
      setIsDone(true);
    }
  }

  function onCompleteDone(result) {
    console.log(result.data);
    var comment = result.data.comment ? result.data.comment : "";
    localStorage.setItem('comment', comment);

    sendResult();
  }

  Survey
    .StylesManager
    .applyTheme();

  // select which survey screen to display based on the state'
  var survey;
  var surveyJSON, onComplete;
  var completeText = "Complete"
  if (!localStorage.getItem('demographics')) {
    surveyJSON = init;
    onComplete = onCompleteInit;
  } else {
    const taskId = JSON.parse(localStorage.getItem('taskId'));
    const taskComplete = JSON.parse(localStorage.getItem('taskComplete'));
    if (isDone) {
      surveyJSON = done;
      onComplete = onCompleteDone;
    } else if (taskComplete) {
      surveyJSON = finishTask(taskId);
      onComplete = onCompleteFinishTask;
    } else {
      surveyJSON = beginTask(taskId);
      onComplete = onCompleteBeginTask;
      completeText = "Begin Task"
    }
  }

  survey = (
    <Survey.Survey
        json={surveyJSON}
        showCompletedPage={false}
        onComplete={onComplete}
        completeText={completeText}
      />
  );
  
  useEffect(() => {
    const taskComplete = JSON.parse(localStorage.getItem('taskComplete'));
    const taskInProgress = JSON.parse(localStorage.getItem('taskInProgress'));
    if (taskInProgress && !taskComplete) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [localStorage.getItem('taskComplete'), localStorage.getItem('taskInProgress')]);

  // render survey
  var surveyRender = (
      <Modal
        isOpen={!localStorage.getItem('demographics') || isVisible}
        style={customStyles}
      >
        {survey}
      </Modal>
    );

    return (
      <div>
        {surveyRender}
      </div>
    );
  }
