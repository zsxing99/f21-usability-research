"use strict";
const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-2" });

exports.handler = async () => {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
  const documentClient = new AWS.DynamoDB.DocumentClient({
    region: "us-east-2",
  });

  let responseBody = "";
  let statusCode = 0;

  const params = {
    TableName: "usability-posts",
  };

  try {
    const data = await documentClient.scan(params).promise();
    responseBody = JSON.stringify(data.Items);
    statusCode = 200;
  } catch (err) {
    responseBody = "An error occured" + err;
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
