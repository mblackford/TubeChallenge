'use strict'

const { getAllStations } = require('../stations/get-all-stations')

module.exports.buildStatus = (visitedStations) => {
  const allStations = getAllStations()
  const totalCount = count(allStations)
  const visitCount = count(visitedStations)
  const totalPercent = Math.round(100 * (visitCount / totalCount))

  return `You have visited ${visitCount} out of ${totalCount} stations (${totalPercent}%).`
}

function count (map) {
  return Object.keys(map).length
}
