const task1 = {
  id: '00',
  title: 'Fill in Availability',
  description: 'You are a volunteer who wants to help with some existing requests. Go ahead and provide the time slots when you are available to volunteer.'
};

const task2 = {
  id: '01',
  title: 'Edit Health Status',
  description: 'Say you have a fever of 101 degrees. Go ahead and update your health condition in the app.'
};

const task3 = {
  id: '02',
  title: 'Complete an On-demand Request',
  description: 'Mary has request some items as part of her "On-Demand" request. You went to a supermarket and delivered the items to Mary. Now go ahead and complete her on-demand request in the app.'
};

const task4 = {
  id: '03',
  title: 'Edit an Item in a Subscription Request',
  description: 'Mary has a weekly subscription request that she wants to modify. She just texted you that she wants to add six oranges to her subscription request. Go ahead and make those changes to her request by adding six oranges.'
};

const task5 = {
  id: '04',
  title: 'Complete a Subscription Request',
  description: `It is time for Mary's weekly subscription request. You can assume that there are no changes to her order and that you went to a supermarket and delivered the items to Mary. Go ahead and complete her subscription request.`
};

const groupA = [task2, task1, task3, task4, task5];
const groupB = [task1, task2, task4, task5, task3];
const groupC = [task3, task1, task2, task4, task5];

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
    case 'A':
      tasks = groupA;
      break;
    case 'B':
      tasks = groupB;
      break;
    case 'C':
      tasks = groupC;
      break;
    default:
      throw 'Invalid groupId'
  }
  return tasks[taskId-1];
}