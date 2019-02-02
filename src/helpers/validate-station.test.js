'use strict';

const { validateStation } = require('./validate-station');

test('some real stations are valid', () => {
  expect(validateStation('highstreetkensington')).toBeTruthy();
  expect(validateStation('stpauls')).toBeTruthy();
  expect(validateStation('chiswickpark')).toBeTruthy();
});

test('some fake stations are invalid', () => {
  expect(validateStation('emilytown')).toBeFalsy();
  expect(validateStation('adelaide')).toBeFalsy();
});
