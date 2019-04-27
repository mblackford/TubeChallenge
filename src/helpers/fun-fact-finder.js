'use strict'

const { canonicalName } = require('../helpers/canonical-name')
const funFacts = require('../config/fun-facts')

module.exports.funFactFinder = (canonicalStation) => {
  for (const factStationName in funFacts) {
    // Is this a fun fact for the station?
    if (canonicalName(factStationName) === canonicalStation) {
      return 'Fun fact! ' + funFacts[factStationName]
    }
  }

  // No fun fact :(
  return ''
}
