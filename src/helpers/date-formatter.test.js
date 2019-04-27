'use strict'

const { dateFormatter } = require('./date-formatter')

test('the date formats correctly', () => {
  expect(dateFormatter(1546726807409)).toEqual('Saturday, January 5, 2019')
})
