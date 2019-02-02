'use strict';

const { instructionsCommand } = require('../commands/instructions-command');
const { joinCommand } = require('../commands/join-command');
const { visitCommand } = require('../commands/visit-command');
const { undoCommand } = require('../commands/undo-command');
const { statusCommand } = require('../commands/status-command');

const commandMap = {
  instructions: instructionsCommand,
  join: joinCommand,
  visit: visitCommand,
  undo: undoCommand,
  status: statusCommand,
};

module.exports.commandParser = (input) => {
  // Check for null/undefined
  if (!input) {
    throw new Error('Invalid input');
  }

  // Trim the input
  const trimmedInput = input.trim();

  // Check for a zero length string
  if (trimmedInput.length === 0) {
    throw new Error('Invalid input');
  }

  // Split the input by any spaces
  const inputParts = trimmedInput.split(' ');

  // Lower case the command for comparison
  const command = inputParts[0].toLowerCase();

  // Look the command up in the map and return it if it exists
  if (commandMap[command]) {
    return {
      command: commandMap[command],
      params: inputParts.slice(1).join(' ').trim(),
    };
  }

  // Default to the visit command
  return {
    command: visitCommand,
    params: input.trim(),
  };
}
