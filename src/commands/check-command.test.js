'use strict'

const { checkCommand } = require('./check-command')
const { getRecord } = require('../dynamo/get-record')

jest.mock('../dynamo/get-record')

const userRecord = {
  stations: [
    { station: 'brondesburypark', visitedAt: 1549401320357 },
    { station: 'actoncentral', visitedAt: 1549401329712 }
  ]
}

test('the check command response for no user record', async () => {
  // Mock the user record from DynamoDB
  getRecord.mockImplementation(() => null)
  expect(await checkCommand('07375000000', 'Test')).toEqual('You are not registered for the Tube Challenge. Text "JOIN <Your Name>" to register.')
})

test('the check command response for an invalid station', async () => {
  // Mock the user record from DynamoDB
  getRecord.mockImplementation(() => userRecord)
  expect(await checkCommand('07375000000', 'Not REAL')).toEqual('Not REAL is not a valid station on the TFL map.')
})

test('the check command response for a visited station', async () => {
  // Mock the user record from DynamoDB
  getRecord.mockImplementation(() => userRecord)
  expect(await checkCommand('07375000000', 'Acton CENTRAL')).toEqual('You visited Acton Central on Tuesday, February 5, 2019.')
})

test('the check command response for an unvisited station', async () => {
  // Mock the user record from DynamoDB
  getRecord.mockImplementation(() => userRecord)
  expect(await checkCommand('07375000000', 'London BRIDGE')).toEqual("You haven't visited London Bridge yet.")
})
