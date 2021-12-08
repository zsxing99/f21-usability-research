export const saveWaitTime = () => {
    let totalWaitTime = parseInt(localStorage.getItem('total_wait_time'));
    let numberOfWaits = parseInt(localStorage.getItem('number_of_waits'));

    if (numberOfWaits === null || isNaN(numberOfWaits)) {
        totalWaitTime = 0;
        numberOfWaits = 0;
    }

    let entries = performance.getEntries();
    let currentWait = 0;
    entries.forEach(entry => {
        if (!isNaN(entry.duration)) {
            currentWait += entry.duration;
        }
    });

    totalWaitTime += currentWait;
    numberOfWaits += 1;

    console.log('currentWait', currentWait);
    console.log('totalWaitTime', totalWaitTime);

    localStorage.setItem('total_wait_time', totalWaitTime);
    localStorage.setItem('number_of_waits', numberOfWaits);
};
