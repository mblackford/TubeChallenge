'use strict'

const AWS = require('aws-sdk')
const esrever = require('esrever')

const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.updateStations = async (phoneNumber, stations) => {
  // Reverse the phone number to use as the ID (better Dynamo shards)
  const id = esrever.reverse(phoneNumber)
  const timestamp = new Date().getTime()

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: { id },
    ExpressionAttributeNames: {
      '#stations': 'stations'
    },
    ExpressionAttributeValues: {
      ':stations': stations,
      ':updatedAt': timestamp
    },
    UpdateExpression: 'SET #stations = :stations, updatedAt = :updatedAt'
  }

  const dynamoPromise = new Promise((resolve, reject) => {
    // Write the record to the database
    dynamoDb.update(params, (error) => {
      // Reject on any errors
      if (error) {
        reject(error)
      }

      // Resolve on success
      resolve()
    })
  })

  await dynamoPromise
}
