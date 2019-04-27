'use strict'

const { validateStation } = require('./validate-station')

test('some real stations are valid', () => {
  expect(validateStation('highstreetkensington')).toEqual('High Street Kensington')
  expect(validateStation('stpauls')).toEqual('St Paul\'s')
  expect(validateStation('chiswickpark')).toEqual('Chiswick Park')
})

test('some fake stations are invalid', () => {
  expect(validateStation('emilytown')).toBeUndefined()
  expect(validateStation('adelaide')).toBeUndefined()
})
