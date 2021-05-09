import {v4 as uuidv4} from 'uuid';

function createResultPayload() {
    var payload = {};
    payload.id = uuidv4();

    payload.demographics = JSON.parse(localStorage.getItem('demographics'));
    payload.demographics.comment = localStorage.getItem('comment');

    var tasks = [];
    for (var i=0; i<5; i++) {
        var task = {};
        task.id = i;
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'no-cors'
    };

    fetch('https://17vdvvwjlc.execute-api.us-east-2.amazonaws.com/prod/usability-data', requestOpts)
        .then(response => console.log(response))
        .catch(error => console.log(error));
}
