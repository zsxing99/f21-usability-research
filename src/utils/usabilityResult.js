import {v4 as uuidv4} from 'uuid';
import { getTask } from './usabilityTasks';
import axios from 'axios';

const TASK_COUNT = 4;

function createResultPayload() {
    var payload = {};
    const taskGroup = localStorage.getItem('taskGroup');
    payload.id = uuidv4();
    payload.demographics = JSON.parse(localStorage.getItem('demographics'));
    payload.demographics.comment = localStorage.getItem('comment');
    payload.demographics.group = taskGroup

    var tasks = [];
    for (var i=0; i<TASK_COUNT; i++) {
        var task = {};

        task.id = getTask(taskGroup, i+1).id;;
        task.events = JSON.parse(localStorage.getItem(`task${i+1}_events`));
        task.survey = JSON.parse(localStorage.getItem(`task${i+1}_surveyResults`));

        tasks.push(task);
    }
    payload.tasks = tasks;

    return payload;
}

export function sendResult() {
    const payload = createResultPayload();
    console.log(payload);

    const requestOpts = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    };

    const proxyURL = 'https://damp-shelf-98234.herokuapp.com/';

    fetch(proxyURL + 'https://17vdvvwjlc.execute-api.us-east-2.amazonaws.com/prod/usability-data', requestOpts)
        .then(response => {
            console.log(response);
            localStorage.clear();
        })
        .catch(error => console.log(error));
}

