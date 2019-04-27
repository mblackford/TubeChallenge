'use strict'

const { getAllStations } = require('../stations/get-all-stations')

module.exports.validateStation = (canonicalStation) => {
  // Check for an empty string
  if (canonicalStation.length === 0) {
    return null
  }

  // Get an array of the station names
  const allStations = getAllStations()

  // Return the correct station (if it exists, null otherwise)
  return allStations[canonicalStation] || null
}
