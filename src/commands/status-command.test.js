'use strict'

const { statusCommand } = require('./status-command')
const { getRecord } = require('../dynamo/get-record')

jest.mock('../dynamo/get-record')

const userRecord = {
  stations: [
    { station: 'brondesburypark', visitedAt: '1549401320357' },
    { station: 'actoncentral', visitedAt: '1549401329712' }
  ]
}

test('the status command response', async () => {
  // Mock the user record from DynamoDB
  getRecord.mockImplementation(() => userRecord)
  expect(await statusCommand('07375000000')).toEqual(
    `You have visited 2 out of 443 stations (0%).
Bakerloo: 0/25.
Central: 0/49.
Circle: 0/35.
DLR: 0/45.
District: 0/60.
Emirates Air Line: 0/2.
Hammersmith and City: 0/29.
Jubilee: 0/27.
London Trams: 0/39.
Metropolitan: 0/34.
Northern: 0/50.
Overground (East London): 0/23.
Overground (Goblin): 0/12.
Overground (Lea Valley): 0/25.
Overground (North London): 2/23.
Overground (Romford-Upminster): 0/3.
Overground (South London): 0/18.
Overground (Watford DC): 0/19.
Overground (West London): 0/6.
Piccadilly: 0/53.
TFL Rail: 0/23.
Victoria: 0/16.
Waterloo and City: 0/2.`
  )
})
