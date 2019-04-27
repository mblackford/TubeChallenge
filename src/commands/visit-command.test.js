'use strict'

const { visitCommand } = require('./visit-command')
const { getRecord } = require('../dynamo/get-record')
const { updateStations } = require('../dynamo/update-stations')

jest.mock('../dynamo/get-record')
jest.mock('../dynamo/update-stations')

const userRecord = {
  stations: [
    { station: 'brondesburypark', visitedAt: 1549401320357 },
    { station: 'actoncentral', visitedAt: 1549401329712 }
  ]
}

test('the visit command response for no user record', async () => {
  // Mock the user record from DynamoDB
  getRecord.mockImplementation(() => null)
  expect(await visitCommand('07375000000', 'Test')).toEqual('You are not registered for the Tube Challenge. Text "JOIN <Your Name>" to register.')
})

test('the visit command response for an invalid station', async () => {
  // Mock the user record from DynamoDB
  getRecord.mockImplementation(() => userRecord)
  expect(await visitCommand('07375000000', 'Not REAL')).toEqual('Not REAL is not a valid station on the TFL map.')
})

test('the visit command response for a visited station', async () => {
  // Mock the user record from DynamoDB
  getRecord.mockImplementation(() => userRecord)
  expect(await visitCommand('07375000000', 'Acton CENTRAL')).toEqual('You have already visited Acton Central on Tuesday, February 5, 2019.')
})

test('the visit command response for an unvisited station', async () => {
  // Mock the user record from DynamoDB
  getRecord.mockImplementation(() => userRecord)

  // Override the update implementation so that it doesn't call DynamoDB
  updateStations.mockImplementation(() => {})
  expect(await visitCommand('07375000000', 'London BRIDGE')).toEqual(
    `Visit to London Bridge recorded.

You have visited 3 out of 443 stations (1%).
Jubilee: 0/27.
Northern: 0/50.

Fun fact! Is the only station on the entire London Underground network with the word “London” in its name. (credit The Nudge)`
  )

  // Check that the update method was called
  // TODO Check the data that was changed in the future
  expect(updateStations).toHaveBeenCalledTimes(1)
})
