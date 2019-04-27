'use strict'

module.exports.instructionsCommand = (params) => `Welcome to the Tube Challenge! To complete it you must visit every station on the TFL tube map within a single year. Whenever you enter or exit a station (you must go in or out of the barriers), text the station's name. It doesn't count if you are merely changing or passing through.

JOIN [Your Name]: register for the Tube Challenge.
VISIT [Station Name]: records a visit.
UNDO [Station Name]: forgets a visit.
STATUS: lists your progress.
INSTRUCTIONS: this instructional message.

Challenge your friends by visiting as many stations as possible or being the first to complete a line.`
