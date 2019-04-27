'use strict'

const merge = require('deepmerge')

const { canonicalName } = require('../helpers/canonical-name')

const tubeStations = require('../config/tube-stations')
const dlrStations = require('../config/dlr-stations')
const overgroundStations = require('../config/overground-stations')
const tflRailStations = require('../config/tfl-rail-stations')
const tramStations = require('../config/tram-stations')

const getAllStations = () => {
  // Merge the data from all the config files
  const allStations = merge.all([
    tubeStations,
    dlrStations,
    overgroundStations,
    tflRailStations,
    tramStations
  ])

  // Get an array of all the station names
  const stationNames = Object.keys(allStations)

  // Build up an object of stations and lines keyed canonically
  const keyedStations = {}
  stationNames.forEach(stationName => {
    // Get the canonical name
    const stationKey = canonicalName(stationName)

    // Add it to the map with the real name and array of lines
    keyedStations[stationKey] = {
      name: stationName,
      lines: allStations[stationName]
    }
  })

  return keyedStations
}

module.exports = { getAllStations }
