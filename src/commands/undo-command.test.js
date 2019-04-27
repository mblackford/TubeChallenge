'use strict'

const { undoCommand } = require('./undo-command')
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

test('the undo command response for no user record', async () => {
  // Mock the user record from DynamoDB
  getRecord.mockImplementation(() => null)
  expect(await undoCommand('07375000000', 'Test')).toEqual('You are not registered for the Tube Challenge. Text "JOIN <Your Name>" to register.')
})

test('the undo command response for an invalid station', async () => {
  // Mock the user record from DynamoDB
  getRecord.mockImplementation(() => userRecord)
  expect(await undoCommand('07375000000', 'Not REAL')).toEqual('Not REAL is not a valid station on the TFL map.')
})

test('the undo command response for a visited station', async () => {
  // Mock the user record from DynamoDB
  getRecord.mockImplementation(() => userRecord)
  expect(await undoCommand('07375000000', 'Acton CENTRAL')).toEqual('Visit to Acton Central has been forgotten.')
})

test('the undo command response for an unvisited station', async () => {
  // Mock the user record from DynamoDB
  getRecord.mockImplementation(() => userRecord)

  // Override the update implementation so that it doesn't call DynamoDB
  updateStations.mockImplementation(() => {})
  expect(await undoCommand('07375000000', 'London BRIDGE')).toEqual(`You haven't previously visited London Bridge.`)

  // Check that the update method was called
  // TODO Check the data that was changed in the future
  expect(updateStations).toHaveBeenCalledTimes(1)
})
