'use strict'

const { commandParser } = require('./command-parser')
const { instructionsCommand } = require('../commands/instructions-command')
const { joinCommand } = require('../commands/join-command')
const { visitCommand } = require('../commands/visit-command')
const { undoCommand } = require('../commands/undo-command')
const { statusCommand } = require('../commands/status-command')
const { checkCommand } = require('../commands/check-command')

test('an empty or null input throws an error', () => {
  expect(() => { commandParser('') }).toThrow('Invalid input')
  expect(() => { commandParser(' ') }).toThrow('Invalid input')
  expect(() => { commandParser(null) }).toThrow('Invalid input')
  expect(() => { commandParser(undefined) }).toThrow('Invalid input')
})

test('the instructions command', () => {
  expect(commandParser('instructions')).toEqual({ command: instructionsCommand, params: '' })
  expect(commandParser('INSTRUCTIONS')).toEqual({ command: instructionsCommand, params: '' })
})

test('the join command', () => {
  expect(commandParser('join Matt')).toEqual({ command: joinCommand, params: 'Matt' })
  expect(commandParser('join Emily')).toEqual({ command: joinCommand, params: 'Emily' })
})

test('the vist command', () => {
  expect(commandParser('VISIT Chiswick Park')).toEqual({ command: visitCommand, params: 'Chiswick Park' })
  expect(commandParser('visit Acton Town')).toEqual({ command: visitCommand, params: 'Acton Town' })
})

test('the undo command', () => {
  expect(commandParser('UNDO Chiswick Park ')).toEqual({ command: undoCommand, params: 'Chiswick Park' })
})

test('the check command', () => {
  expect(commandParser('CHECK Chiswick Park ')).toEqual({ command: checkCommand, params: 'Chiswick Park' })
})

test('the status command', () => {
  expect(commandParser('status')).toEqual({ command: statusCommand, params: '' })
})

test('any other command is handled as visit by default', () => {
  expect(commandParser('Chiswick Park')).toEqual({ command: visitCommand, params: 'Chiswick Park' })
  expect(commandParser('Acton Town')).toEqual({ command: visitCommand, params: 'Acton Town' })
})
