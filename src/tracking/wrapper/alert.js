function increaseAlertCount() {
    let currentTaskAlertCount = parseInt(localStorage.getItem('current_task_alert_count'));
    if (currentTaskAlertCount === null || isNaN(currentTaskAlertCount)) {
        currentTaskAlertCount = 0;
    }

    currentTaskAlertCount += 1;

    localStorage.setItem('current_task_alert_count', currentTaskAlertCount);
}

export const browserAlertTracking = () => {
    increaseAlertCount();
};

export const alertWithTracking = (message) => {
    alert(message);
    increaseAlertCount();
}

export const resetAlertCount = () => {
    localStorage.setItem('current_task_alert_count', 0);
}

export const getAlertCount = () => {
    const localStorageAlertCount = localStorage.getItem('current_task_alert_count');
    return localStorageAlertCount !== null ? localStorageAlertCount : 0;
}
