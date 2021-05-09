"use strict";
const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-2" });

exports.handler = async (event, context) => {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
  const documentClient = new AWS.DynamoDB.DocumentClient({
    region: "us-east-2",
  });

  let responseBody = "";
  let statusCode = 0;

  const { id, demographics, tasks } = JSON.parse(event.body);

  const params = {
    TableName: "usability-posts",
    Item: {
      id: id,
      demographics: demographics,
      tasks: tasks,
    },
  };

  //   const params = {
  //     TableName: "usability-posts",
  //     Item: {
  //   "id": "0123",
  //   "demographics": {
  //     "age": "25",
  //     "gender": "M"
  //   },
  //   "tasks": [
  //     {
  //       "id": "00",
  //       "events": [
  //         {
  //           "type": "STEP",
  //           "data": {
  //             "pageName": "AVAILABILITY_HEALTH_STATUS",
  //             "interactionType": "click",
  //             "actionType": "navigation",
  //             "action": "User elected to navigate to AVAILABILITY_HEALTH_STATUS page."
  //           },
  //           "timestamp": "2021-05-01T14:09:43-04:00"
  //         }
  //       ],
  //       "survey": ["3", "4", "1"]
  //     },
  //     {
  //       "id": "01",
  //       "events": [
  //         {
  //           "type": "STEP",
  //           "data": {
  //             "pageName": "AVAILABILITY_HEALTH_STATUS",
  //             "interactionType": "click",
  //             "actionType": "navigation",
  //             "action": "User elected to navigate to AVAILABILITY_HEALTH_STATUS page."
  //           },
  //           "timestamp": "2021-05-01T14:09:43-04:00"
  //         },
  //         {
  //           "type": "STEP",
  //           "data": {
  //             "pageName": "AVAILABILITY_HEALTH_STATUS",
  //             "interactionType": "click",
  //             "actionType": "navigation",
  //             "action": "User elected to navigate to AVAILABILITY_HEALTH_STATUS page."
  //           },
  //           "timestamp": "2021-05-01T14:09:43-04:00"
  //         }
  //       ],
  //       "survey": ["2", "3", "4"]
  //     }
  //   ]
  // }
  // ,
  //   };

  try {
    const data = await documentClient.put(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 201;
  } catch (err) {
    responseBody = "Unable to put the recipe : {$err}";
    statusCode = 403;
    console.log(err);
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
      "access-control-allow-origin": "*",
    },
    body: responseBody,
  };
  return response;
};
