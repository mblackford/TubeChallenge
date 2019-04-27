'use strict'

const { canonicalName } = require('./canonical-name')

test('an empty string does not throw an error', () => {
  expect(canonicalName('')).toEqual('')
})

test('all-cased strings are correctly handled', () => {
  expect(canonicalName('HAMMERSMITH')).toEqual('hammersmith')
  expect(canonicalName('HammerSmith')).toEqual('hammersmith')
  expect(canonicalName('hammersmith')).toEqual('hammersmith')
})

test('that punctuation and spaces are correctly removed', () => {
  expect(canonicalName('Bromley-by-Bow')).toEqual('bromleybybow')
  expect(canonicalName('Bromley by Bow')).toEqual('bromleybybow')
  expect(canonicalName("St Paul's")).toEqual('stpauls')
  expect(canonicalName('St Pauls')).toEqual('stpauls')
})

test("that the St James's Park special case is handled", () => {
  expect(canonicalName("St James's Park")).toEqual('stjamesspark')
  expect(canonicalName('St Jamess Park')).toEqual('stjamesspark')
  expect(canonicalName("St James' Park")).toEqual('stjamesspark')
  expect(canonicalName('St James Park')).toEqual('stjamesspark')
})

test('that the Heathrow special cases are handled', () => {
  expect(canonicalName('Heathrow Terminals 2 and 3')).toEqual('heathrowterminals23')
  expect(canonicalName('Heathrow Terminals 2 & 3')).toEqual('heathrowterminals23')
  expect(canonicalName('Heathrow Terminals 2&3')).toEqual('heathrowterminals23')
  expect(canonicalName('Heathrow Terminal 4')).toEqual('heathrowterminal4')
  expect(canonicalName('Heathrow Terminal 5')).toEqual('heathrowterminal5')
})
