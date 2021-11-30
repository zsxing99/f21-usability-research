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

const questionMap = new Map();
questionMap.set('satisfaction-1', [
  'I am satisfied with the system.',
  'I found the system unpleasant to use.'
]);
questionMap.set('effectiveness-1', [
  'I was able to use the system successfully.',
  'I found some tasks cumbersome to complete.'
]);
questionMap.set('effectiveness-2', [
  'The system allowed me to complete the tasks accurately.',
  'I wish the system had provided more instructions.'
]);
questionMap.set('efficiency-1', [
  'I was able to complete the tasks quickly.',
  'I found some tasks unnecessary long.'
]);
questionMap.set('efficiency-2', [
  'I was able to copmlete the tasks with a reasonable number of steps.',
  'I found the system unnecessarily complex.'
]);
questionMap.set('learnability', [
  'It was easy to learn to use this system.',
  'I wish the system would have provided more information to help me better understand the outcomes of my actions.'
]);

const finishTask = (taskId) => {
  // -1 : negative question
  // 1  : positive question
  const questionArray = []

  questionMap.forEach((value, key, questionMap) => {
    const idx = Math.floor(Math.random() * 2);
    questionArray.push({
      type: "dropdown",
      name: key,
      title: value[idx],
      choices: idx == 0 ? positiveUsabilityChoices : negativeUsabilityChoices,
      isRequired: true
    })
  })

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
      var surveyResults = [];
      for (let k in result.data) {
        surveyResults.push(result.data[k]);
      }
      localStorage.setItem(`task${taskId}_surveyResults`, JSON.stringify(surveyResults));
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
    const taskId = JSON.parse(localStorage.getItem('taskId'));
    let taskComplete = JSON.parse(localStorage.getItem('taskComplete'));

    if (taskComplete && taskId < TASK_COUNT) {
      saveTaskResult(null);
      taskComplete = false;
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
