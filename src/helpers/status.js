'use strict'

const { getAllLines } = require('../stations/get-all-lines')
const { getAllStations } = require('../stations/get-all-stations')

const allStations = getAllStations()
const totalCount = count(allStations)

const overall = (visitedStations) => {
  const visitCount = count(visitedStations)

  if (visitCount === totalCount) {
    return `Congratulations! You have completed all ${totalCount} stations of the Tube Challenge. Time to try the Bus Challenge?`
  }

  const totalPercent = Math.round(100 * (visitCount / totalCount))
  return `You have visited ${visitCount} out of ${totalCount} stations (${totalPercent}%).`
}

const line = (visitedStations, line) => {
  const stationKeys = Object.keys(allStations)
  const lineStationKeys = stationKeys.filter(key => {
    return allStations[key].lines.includes(line)
  })

  // Validate that the line has stations (it should)
  if (count(lineStationKeys) === 0) {
    throw new Error(`Line [${line}] doesn't have any stations!`)
  }

  const visitedLineStations = visitedStations.filter(value => lineStationKeys.includes(value))

  const visitCount = count(visitedLineStations)
  const totalLineCount = count(lineStationKeys)

  if (visitCount === totalLineCount) {
    return `${line} done!`
  }

  return `${line}: ${visitCount}/${totalLineCount}.`
}

const station = (visitedStations, stationKey) => {
  const lines = allStations[stationKey].lines.sort()

  // Get the default overall message
  let messages = [overall(visitedStations)]

  // Check to maker sure hasn't visited every station
  if (count(visitedStations) !== totalCount) {
    lines.forEach(lineName => {
      messages.push(line(visitedStations, lineName))
    })
  }

  // Return the messages separated by spaces
  return messages.join('\n')
}

const all = (visitedStations) => {
  // Get all the lines
  const lines = Object.keys(getAllLines()).sort()

  // Get the default overall message
  let messages = [overall(visitedStations)]

  // Get the individual status for each line
  lines.forEach(lineName => {
    messages.push(line(visitedStations, lineName))
  })

  // Return the messages separated by spaces
  return messages.join('\n')
}

function count (map) {
  return Object.keys(map).length
}

module.exports = { overall, line, station, all }
