export const onAction = (event = {}, eventsHistory) => {
    console.log("logging event: \n" + JSON.stringify(event, null, 2));

    var events = JSON.parse(localStorage.getItem('events'));
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));

    return event;
}