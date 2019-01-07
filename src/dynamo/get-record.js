'use strict';

const AWS = require('aws-sdk'); 
const esrever = require('esrever');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getRecord = async (phoneNumber) => {
  // Reverse the phone number to use as the ID (better Dynamo shards)
  const id = esrever.reverse(phoneNumber);

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: { id },
  };

  const dynamoPromise = new Promise((resolve, reject) => {
    // Fetch record from the database
    dynamoDb.get(params, (error, result) => {
      // Reject on errors
      if (error) {
        reject(error);
      }

      // Return the result
      resolve(result.Item);
    });
  });
  
  return await dynamoPromise;
};