'use strict'

const { visitCommand } = require('./visit-command')
const { getRecord } = require('../dynamo/get-record')
const { updateStations } = require('../dynamo/update-stations')

jest.mock('../dynamo/get-record')
jest.mock('../dynamo/update-stations')

let userRecord = {}

beforeEach(() => {
  // Reset the user record between each test (it gets added to otherwise)
  userRecord = {
    stations: [
      { station: 'actoncentral', visitedAt: 1549401320357 },
      { station: 'deptfordbridge', visitedAt: 1549401329712 }
    ]
  }

  // Reset the mocks
  jest.resetAllMocks()
})

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
Jubilee: 1/27.
Northern: 1/50.

Fun fact! Is the only station on the entire London Underground network with the word “London” in its name. (credit The Nudge)`
  )

  // Check that the update method was called
  // TODO Check the data that was changed in the future
  expect(updateStations).toHaveBeenCalledTimes(1)
})

test('the visit command response for an unvisited DLR station', async () => {
  // Mock the user record from DynamoDB
  getRecord.mockImplementation(() => userRecord)

  // Override the update implementation so that it doesn't call DynamoDB
  updateStations.mockImplementation(() => {})
  expect(await visitCommand('07375000000', 'Woolwich ARSENAL')).toEqual(
    `Visit to Woolwich Arsenal recorded.

You have visited 3 out of 443 stations (1%).
DLR: 2/45.`
  )

  // Check that the update method was called
  // TODO Check the data that was changed in the future
  expect(updateStations).toHaveBeenCalledTimes(1)
})

test('the visit command response when less than 100 stations', async () => {
  // Mock the user record from DynamoDB
  const fakeStations = []
  for (let index = 0; index < 400; index++) {
    fakeStations.push({ station: 'actoncentral', visitedAt: 1549401320357 })
  }
  const bigRecord = { stations: fakeStations }
  getRecord.mockImplementation(() => bigRecord)

  // Override the update implementation so that it doesn't call DynamoDB
  updateStations.mockImplementation(() => {})

  // Run the command
  expect(await visitCommand('07375000000', 'Southfields')).toEqual(
    `Visit to Southfields recorded.

You have visited 401 out of 443 stations (91%).
District: 1/60.

Fun fact! The station platform undergoes a makeover each year to coincide with the Wimbledon tennis tournament. Wimbledon station doesn't. (credit The Nudge)

Only 42 stations to go!`
  )

  // Check that the update method was called
  // TODO Check the data that was changed in the future
  expect(updateStations).toHaveBeenCalledTimes(1)
})

test('the visit command response when 1 station remaining', async () => {
  // Mock the user record from DynamoDB
  const fakeStations = []
  for (let index = 0; index < 441; index++) {
    fakeStations.push({ station: 'actoncentral', visitedAt: 1549401320357 })
  }
  const bigRecord = { stations: fakeStations }
  getRecord.mockImplementation(() => bigRecord)

  // Override the update implementation so that it doesn't call DynamoDB
  updateStations.mockImplementation(() => {})

  // Run the command
  expect(await visitCommand('07375000000', 'Acton Main Line')).toEqual(
    `Visit to Acton Main Line recorded.

You have visited 442 out of 443 stations (100%).
TFL Rail: 1/23.

Only 1 last station to go! So close now!`
  )

  // Check that the update method was called
  // TODO Check the data that was changed in the future
  expect(updateStations).toHaveBeenCalledTimes(1)
})
