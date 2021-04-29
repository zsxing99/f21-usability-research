export const onAction = (event = {}, eventsHistory) => {
    // TODO: add code ot push each event to DB
    // store locally on a task-level
    // chronological order
    console.log("logging event: \n" + JSON.stringify(event, null, 2));
    return event;
}