'use strict'

const { validateStation } = require('./validate-station')

test('an empty string returns null', () => {
  expect(validateStation('')).toBeNull()
})

test('some real stations are valid', () => {
  expect(validateStation('highstreetkensington').name).toEqual('High Street Kensington')
  expect(validateStation('highstreetkensington').lines).toHaveLength(2)
  expect(validateStation('stpauls').name).toEqual('St Paul\'s')
  expect(validateStation('stpauls').lines).toHaveLength(1)
  expect(validateStation('chiswickpark').name).toEqual('Chiswick Park')
  expect(validateStation('chiswickpark').lines).toHaveLength(1)
})

test('some fake stations are invalid', () => {
  expect(validateStation('emilytown')).toBeNull()
  expect(validateStation('adelaide')).toBeNull()
})
