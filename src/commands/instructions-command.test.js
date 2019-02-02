'use strict'

const { instructionsCommand } = require('./instructions-command');

test('the instructions command response', () => {
  expect(instructionsCommand()).toContain('JOIN');
  expect(instructionsCommand()).toContain('VISIT');
  expect(instructionsCommand()).toContain('UNDO');
  expect(instructionsCommand()).toContain('STATUS');
  expect(instructionsCommand()).toContain('INSTRUCTIONS');
});
