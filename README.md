# Usability Researcg Project

## Operation Instructions

- To run the app in the development mode, run `npm i` followed by `npm start` in the project directory.\
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- You can also access the deployed version on AWS [here] (https://master.dt4hax1qnalrw.amplifyapp.com/)

## Technology Stack

- React
- Bootstrap
- HTML
- CSS
- AWS Lambda, Amplify, DynamoDB

## Style Guide

Click [link](https://company-205442.frontify.com/d/8Pnfq9AaB79x) to view the style guide.

## Limitations

- The only items that will show pictures are: Organic Milk, Yogurt, and Orange
- Private chat and call functionalities are incomplete
- If a volunteer's account gets locked because they show COVID symptoms, it does not actually lock the account, it is just an alert
- Data is not saved so refreshing the page will delete any temporarily displayed data.

## AWS integration

- The app is hosted using AWS Amplify
- AWS Lambda is used for the serverless architecture to POST and GET experiment data, for which the documentation can be found in`/serverless`
- The GET endpoint returns all results, TODO: paginate the results
