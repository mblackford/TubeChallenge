'use strict'

const { funFactFinder } = require('./fun-fact-finder')

test('some stations with facts', () => {
  expect(funFactFinder('highstreetkensington')).toHaveLength(146)
  expect(funFactFinder('stpauls')).toHaveLength(174)
  expect(funFactFinder('chiswickpark')).toHaveLength(128)
})

test('some stations without facts', () => {
  expect(funFactFinder('shadwell')).toEqual('')
  expect(funFactFinder('deptfordbridge')).toEqual('')
})
