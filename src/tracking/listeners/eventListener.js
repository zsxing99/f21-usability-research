export const onAction = (event = {}, eventsHistory) => {
    console.log("logging event: \n" + JSON.stringify(event, null, 2));
    return event;
}