const task1 = {
  id: "00",
  title: "Fill in Availability",
  scenario: "You have a fever of 101 degrees.",
  description: "Use the app to update your health status.",
};

const task2 = {
  id: "01",
  title: "Edit Health Status",
  scenario:
    "You are a volunteer who wants to help with some existing requests.",
  description:
    "Use the app to provide the time slots that you’re available for volunteering.",
};

const task3 = {
  id: "02",
  title: `Complete Mary's Request`,
  scenario:
    "Mary has requested some items to be delivered. You went to a supermarket and delivered the items to Mary.",
  description: "Complete her request in the app.",
};

const task4 = {
  id: "03",
  title: "Edit Walt’s Request",
  scenario:
    "Walt has requested 2 milks to be delivered. However, he just used the chat functionality of the app to let you know that he would like only one. This needs to be updated before you go to the supermarket.",
  description: "Update the quantity of milk in Walt’s request in the app.",
};

const groupA = [task2, task1, task3, task4];
const groupB = [task1, task2, task4, task3];
const groupC = [task3, task1, task2, task4];

const taskGroupIds = ["A", "B", "C"];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function getTaskGroup() {
  const groupIdx = getRandomInt(3);
  return taskGroupIds[groupIdx];
}
export function getTask(groupId, taskId) {
  var tasks;
  switch (groupId) {
    case "A":
      tasks = groupA;
      break;
    case "B":
      tasks = groupB;
      break;
    case "C":
      tasks = groupC;
      break;
    default:
      throw "Invalid groupId";
  }
  return tasks[taskId - 1];
}
