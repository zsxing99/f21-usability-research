import React, { useEffect } from 'react';
import { useState } from 'react';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';
import Modal from 'react-modal';
import { sendResult } from '../utils/usabilityResult';
import { getTaskGroup, getTask } from '../utils/usabilityTasks';
import { resetAlertCount, getAlertCount } from '../tracking/wrapper/alert';

const TASK_COUNT = 4;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    maxHeight: '90vh',
    maxWidth: '90%',
    overflowY: 'auto',
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
            You will be using an app meant for volunteers interested in helping out individuals in need.  Volunteers can deliver essentials to people who cannot get out of their homes. You will go through the activity by performing ${TASK_COUNT} tasks. After each task, you will take a short survey.
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
    title: `Task ${taskId} out of ${TASK_COUNT}`,
    description: `${task.title}`,
    questions: [
      {
        type: "html",
        html: `
          You are about begin task ${taskId} of the usability study.
          <br/><br/>
          <u>Scenario:</u> ${task.scenario}
          <br/><br/>
          <u>Task:</u> ${task.description}
          <br/><br/>
          Please click on <b>Begin Task</b> to start the task, and click on <b>Finish Task</b> button to end the task.
          <br/><br/>
          (If you want to view the task descriptions again during the test, click on <b>?</b> button.)
        `
      }
    ]
  }
};

const positiveUsabilityChoices = [
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

const negativeUsabilityChoices = [
  {
    value: 5,
    text: "Strongly Disagree"
  }, {
    value: 4,
    text: "Disagree"
  }, {
    value: 3,
    text: "Indifferent"
  }, {
    value: 2,
    text: "Agree"
  }, {
    value: 1,
    text: "Strongly Agree"
  }
];

const finishTask = () => {
  const questionArray = [
    {
      type: "dropdown",
      name: "satisfaction-positive",
      title: 'I am satisfied with the system.',
      choices: positiveUsabilityChoices,
      isRequired: true
    },
    {
      type: "dropdown",
      name: "satisfaction-negative",
      title: 'I found the system unpleasant to use.',
      choices: negativeUsabilityChoices,
      isRequired: true
    },
    {
      type: "dropdown",
      name: "effectiveness-1-positive",
      title: 'I was able to use the system successfully.',
      choices: positiveUsabilityChoices,
      isRequired: true
    },
    {
      type: "dropdown",
      name: "effectiveness-1-negative",
      title: 'I found some tasks cumbersome to complete.',
      choices: negativeUsabilityChoices,
      isRequired: true
    },
    {
      type: "dropdown",
      name: "effectiveness-2-positive",
      title: 'The system allowed me to complete the tasks accurately.',
      choices: positiveUsabilityChoices,
      isRequired: true
    },
    {
      type: "dropdown",
      name: "effectiveness-2-negative",
      title: 'I wish the system had provided more instructions.',
      choices: negativeUsabilityChoices,
      isRequired: true
    },
    {
      type: "dropdown",
      name: "efficiency-1-positive",
      title: 'I was able to complete the tasks quickly.',
      choices: positiveUsabilityChoices,
      isRequired: true
    },
    {
      type: "dropdown",
      name: "efficiency-1-negative",
      title: 'I found some tasks unnecessary long.',
      choices: negativeUsabilityChoices,
      isRequired: true
    },
    {
      type: "dropdown",
      name: "efficiency-2-positive",
      title: 'I was able to copmlete the tasks with a reasonable number of steps.',
      choices: positiveUsabilityChoices,
      isRequired: true
    },
    {
      type: "dropdown",
      name: "efficiency-2-negative",
      title: 'I found the system unnecessarily complex.',
      choices: negativeUsabilityChoices,
      isRequired: true
    },
    {
      type: "dropdown",
      name: "learnability-positive",
      title: 'It was easy to learn to use this system.',
      choices: positiveUsabilityChoices,
      isRequired: true
    },
    {
      type: "dropdown",
      name: "learnability-negative",
      title: 'I wish the system would have provided more information to help me better understand the outcomes of my actions.',
      choices: negativeUsabilityChoices,
      isRequired: true
    }
  ];

  let currentIndex = questionArray.length, randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [questionArray[currentIndex], questionArray[randomIndex]] = [
      questionArray[randomIndex], questionArray[currentIndex]];
  }

  return {
    title: `All Tasks`,
    description: `Usability Survey Questions`,
    questions: questionArray
  }
};

const done = {
  title: "Finishing Up",
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
    saveTaskResult(result);
  }

  function saveTaskResult(result) {
    // Store collected events
    var events = JSON.parse(localStorage.getItem('events'));
    localStorage.setItem(`task${taskId}_events`, JSON.stringify(events));

    // Reset events array
    events = [];
    localStorage.setItem('events', JSON.stringify(events));

    // Store collected number of alerts
    localStorage.setItem(`task${taskId}_alerts`, getAlertCount());

    // Reset number of alerts
    resetAlertCount();

    if (result !== null) {
      // Store collected survey results
      const orderedResult = Object.keys(result.data).sort().reduce((obj, key) => {
        obj[key] = result.data[key];
        return obj;
      }, {});

      localStorage.setItem(`surveyResults`, JSON.stringify(orderedResult));
    }
    localStorage.setItem('taskInProgress', false);

    if (taskId < TASK_COUNT) {
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
    let taskId = JSON.parse(localStorage.getItem('taskId'));
    let taskComplete = JSON.parse(localStorage.getItem('taskComplete'));

    if (taskComplete && taskId < TASK_COUNT) {
      saveTaskResult(null);
      taskId = JSON.parse(localStorage.getItem('taskId'));
      taskComplete = JSON.parse(localStorage.getItem('taskComplete'));
    }

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
