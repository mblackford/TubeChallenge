'use strict'

const { toGoMessage } = require('./to-go-message')

test('less than 100 stations to go', () => {
  expect(toGoMessage(400)).toEqual('\n\nOnly 43 stations to go!')
  expect(toGoMessage(410)).toEqual('\n\nOnly 33 stations to go!')
})

test('100 or more stations to go', () => {
  expect(toGoMessage(343)).toEqual('')
  expect(toGoMessage(300)).toEqual('')
})

test('no stations to go', () => {
  expect(toGoMessage(443)).toEqual('')
})

test('1 station to go', () => {
  expect(toGoMessage(442)).toEqual('\n\nOnly 1 last station to go! So close now!')
})

test('negative stations to go', () => {
  expect(toGoMessage(500)).toEqual('')
})
