'use strict'

const { canonicalName } = require('./canonical-name')
const { getAllStations } = require('../stations/get-all-stations')

module.exports.validateStation = (canonicalStation) => {
  if (canonicalStation.length === 0) {
    return false
  }

  // Loop through all stations and see if they match when canonicalised
  for (const stationName in getAllStations()) {
    if (canonicalName(stationName) === canonicalStation) {
      // Return the official station name
      return stationName
    }
  }

  // Not matching station
  return undefined
}
