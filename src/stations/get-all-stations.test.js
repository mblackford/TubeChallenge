'use strict'

const { getAllStations } = require('./get-all-stations')

test('the correct number of stations is loaded', () => {
  expect(Object.keys(getAllStations())).toHaveLength(443)
})

test('select stations have the right non-canonicalised name', () => {
  const allStations = getAllStations()
  expect(allStations['chiswickpark'].name).toEqual('Chiswick Park')
  expect(allStations['queenspark'].name).toEqual('Queens Park')
  expect(allStations['stjamesspark'].name).toEqual("St James's Park")
})

test('select stations contain the right number of lines', () => {
  const allStations = getAllStations()
  expect(allStations['chiswickpark'].lines).toHaveLength(1)
  expect(allStations['stratford'].lines).toHaveLength(5)
  expect(allStations['bank'].lines).toHaveLength(4)
  expect(allStations['canadawater'].lines).toHaveLength(2)
  expect(allStations['wimbledon'].lines).toHaveLength(2)
  expect(allStations['liverpoolstreet'].lines).toHaveLength(6)
  expect(allStations['brondesburypark'].lines).toHaveLength(1)
})
