'use strict'

const { getAllLines } = require('./get-all-lines')

test('the correct number of lines is loaded', () => {
  const allLines = getAllLines()
  expect(Object.keys(allLines)).toHaveLength(23)
})

test('select lines contain the right number of stations', () => {
  const allLines = getAllLines()
  expect(allLines['District']).toHaveLength(60)
  expect(allLines['DLR']).toHaveLength(45)
  expect(allLines['Waterloo and City']).toHaveLength(2)
  expect(allLines['Overground (East London)']).toHaveLength(23)
  expect(allLines['Overground (Goblin)']).toHaveLength(12)
  expect(allLines['Overground (Lea Valley)']).toHaveLength(25)
  expect(allLines['Overground (North London)']).toHaveLength(23)
  expect(allLines['Overground (Romford-Upminster)']).toHaveLength(3)
  expect(allLines['Overground (South London)']).toHaveLength(18)
  expect(allLines['Overground (Watford DC)']).toHaveLength(19)
  expect(allLines['Overground (West London)']).toHaveLength(6)
  expect(allLines['TFL Rail']).toHaveLength(23)
  expect(allLines['London Trams']).toHaveLength(39)
})

test('select line contains the right canonicalised station names', () => {
  const allLines = getAllLines()
  expect(allLines['TFL Rail']).toEqual([
    'westealing',
    'southall',
    'shenfield',
    'sevenkings',
    'maryland',
    'manorpark',
    'ilford',
    'hayesharlington',
    'haroldwood',
    'hanwell',
    'goodmayes',
    'gideapark',
    'forestgate',
    'chadwellheath',
    'brentwood',
    'actonmainline',
    'romford',
    'stratford',
    'paddington',
    'liverpoolstreet',
    'heathrowterminal4',
    'heathrowterminals23',
    'ealingbroadway'
  ])
})
