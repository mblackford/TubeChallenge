'use strict'

const status = require('./status')
const { getAllStations } = require('../stations/get-all-stations')

const visitedStations = [
  'chiswickpark',
  'mansionhouse',
  'hammersmith',
  'bank',
  'londonbridge',
  'deptfordbridge',
  'waterloo'
]

test('no lines visited overall', () => {
  const noStations = []
  const overallStatus = status.overall(noStations)
  expect(overallStatus).toEqual('You have visited 0 out of 444 stations (0%).')
})

test('7 stations visited overall', () => {
  const overallStatus = status.overall(visitedStations)
  expect(overallStatus).toEqual('You have visited 7 out of 444 stations (2%).')
})

test('bad line does something', () => {
  expect(() => status.line(visitedStations, 'Not a real line')).toThrowError("Line [Not a real line] doesn't have any stations!")
})

test('3 District Line stations visited', () => {
  const lineStatus = status.line(visitedStations, 'District')
  expect(lineStatus).toEqual('District: 3/60.')
})

test('Waterloo and City finished', () => {
  const lineStatus = status.line(visitedStations, 'Waterloo and City')
  expect(lineStatus).toEqual('Waterloo and City done!')
})

test('2 DLR stations visited', () => {
  const lineStatus = status.line(visitedStations, 'DLR')
  expect(lineStatus).toEqual('DLR: 2/45.')
})

test('2nd DLR station is visited', () => {
  const stationStatus = status.station(visitedStations, 'bank')
  expect(stationStatus).toEqual(`You have visited 7 out of 444 stations (2%).
Central: 1/49.
DLR: 2/45.
Northern: 3/50.
Waterloo and City done!`)
})

test('all stations visited', () => {
  const stationStatus = status.station(Object.keys(getAllStations()), 'londonbridge')
  expect(stationStatus).toEqual('Congratulations! You have completed all 444 stations of the Tube Challenge. Time to try the Bus Challenge?')
})

test('the all lines status check', () => {
  const allStatus = status.all(visitedStations)
  expect(allStatus).toEqual(`You have visited 7 out of 444 stations (2%).
Bakerloo: 1/25.
Central: 1/49.
Circle: 2/35.
DLR: 2/45.
District: 3/60.
Emirates Air Line: 0/2.
Hammersmith and City: 1/29.
Jubilee: 2/27.
London Trams: 0/39.
Metropolitan: 0/34.
Northern: 3/50.
Overground (East London): 0/23.
Overground (Goblin): 0/12.
Overground (Lea Valley): 0/25.
Overground (North London): 0/23.
Overground (Romford-Upminster): 0/3.
Overground (South London): 0/19.
Overground (Watford DC): 0/19.
Overground (West London): 0/6.
Piccadilly: 1/53.
TFL Rail: 0/23.
Victoria: 0/16.
Waterloo and City done!`)
})
