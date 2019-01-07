'use strict';

module.exports.instructionsCommand = (params) => {
  return `
    JOIN [Your Name]: register for the Tube Challenge.\n
    VISIT [Station Name]: records a visit.\n
    UNDO [Station Name]: forgets a visit.\n
    INSTRUCTIONS: this instructional message.\n
  `;
}
