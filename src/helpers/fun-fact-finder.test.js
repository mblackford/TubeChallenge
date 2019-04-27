'use strict'

const { funFactFinder } = require('./fun-fact-finder')

test('some stations with facts', () => {
  expect(funFactFinder('highstreetkensington')).toHaveLength(147)
  expect(funFactFinder('stpauls')).toHaveLength(175)
  expect(funFactFinder('chiswickpark')).toHaveLength(129)
})

test('some stations without facts', () => {
  expect(funFactFinder('shadwell')).toEqual('')
  expect(funFactFinder('deptfordbridge')).toEqual('')
})
