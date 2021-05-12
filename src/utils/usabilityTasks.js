const task1 = {
  id: '00',
  title: 'Fill in Availability',
  scenario: 'You have a fever of 101 degrees.',
  description: 'Use the app to update your health status.'
};

const task2 = {
  id: '01',
  title: 'Edit Health Status',
  scenario: 'You are a volunteer who wants to help with some existing requests.',
  description: 'Use the app to provide the time slots that you’re available for volunteering.'
};

const task3 = {
  id: '02',
  title: 'Complete an On-demand Request',
  scenario: 'Mary has requested some items as part of her ‘On-demand’ request. You went to a supermarket and delivered the items to Mary.',
  description: 'Complete her on-demand request in the app.'
};

const task4 = {
  id: '03',
  title: 'Edit an Item in a Subscription Request',
  scenario: 'It is time for Mary’s weekly subscription request. There are no changes to her order; thus, you went to a supermarket and delivered her items.',
  description: 'Complete her subscription request.'
};

const task5 = {
  id: '04',
  title: 'Complete a Subscription Request',
  scenario: 'Mary has a weekly subscription request that she wants to modify. She texted, asking you to add 6 oranges to her subscription request.',
  description: 'Use the app to change her request.'
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