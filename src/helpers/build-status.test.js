'use strict'

const { buildStatus } = require('./build-status')

test('no lines visited', () => {
  const visitedStations = []
  const status = buildStatus(visitedStations)
  expect(status).toEqual('You have visited 0 out of 444 stations (0%).')
})
