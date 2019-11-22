'use strict'

const { getAllStations } = require('../stations/get-all-stations')

module.exports.toGoMessage = (completedStations) => {
  const allStations = getAllStations()
  const totalCount = count(allStations)
  const toGo = totalCount - completedStations

  if (toGo === 1) {
    return '\n\nOnly 1 last station to go! So close now!'
  } else if (toGo < 100 && toGo > 1) {
    return `\n\nOnly ${toGo} stations to go!`
  } else {
    return ''
  }
}

function count (map) {
  return Object.keys(map).length
}
