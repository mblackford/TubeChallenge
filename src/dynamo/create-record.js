'use strict';

const AWS = require('aws-sdk'); 
const esrever = require('esrever');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.createRecord = async (phoneNumber, username) => {
  // Reverse the phone number to use as the ID (better Dynamo shards)
  const id = esrever.reverse(phoneNumber);
  const timestamp = new Date().getTime();

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id,
      username,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  const dynamoPromise = new Promise((resolve, reject) => {
    // Write the record to the database
    dynamoDb.put(params, (error) => {
      // Reject on any errors
      if (error) {
        reject(error);
      }

      // Resolve on success
      resolve();
    });
  });
  
  await dynamoPromise;
};