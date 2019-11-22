'use strict'

const { updateStations } = require('../dynamo/update-stations')
const { getRecord } = require('../dynamo/get-record')
const { canonicalName } = require('../helpers/canonical-name')
const { validateStation } = require('../helpers/validate-station')
const { dateFormatter } = require('../helpers/date-formatter')
const { funFactFinder } = require('../helpers/fun-fact-finder')
const { toGoMessage } = require('../helpers/to-go-message')
const status = require('../helpers/status')

module.exports.visitCommand = async (phoneNumber, station) => {
  // Get the user and check if they exist
  const user = await getRecord(phoneNumber)
  if (!user) {
    return `You are not registered for the Tube Challenge. Text "JOIN <Your Name>" to register.`
  }

  // Get the canonicalised version of the station
  const canonicalStation = canonicalName(station)

  // Check if it's a valid station
  const validatedStation = validateStation(canonicalStation)
  if (!validatedStation) {
    return `${station} is not a valid station on the TFL map.`
  }

  // Get the current visited stations (default to empty array)
  const visitedStations = user.stations || []

  // Does the list already contain the station?
  const previousVisits = visitedStations.filter(item => item.station === canonicalStation)
  if (previousVisits.length > 0) {
    const visitDate = dateFormatter(previousVisits[0].visitedAt)
    return `You have already visited ${validatedStation.name} on ${visitDate}.`
  }

  // Add the station to the list
  const timestamp = new Date().getTime()
  visitedStations.push({ station: canonicalStation, visitedAt: timestamp })

  // Save the user record
  await updateStations(phoneNumber, visitedStations)

  // Is there a fun fact for this station?
  const funFactPhrase = funFactFinder(canonicalStation)

  // Is there a countdown to the end message?
  const toGoMsg = toGoMessage(count(visitedStations))

  // Return the response
  const visitedStationList = visitedStations.map(record => record.station)
  return `Visit to ${validatedStation.name} recorded.\n\n` + status.station(visitedStationList, canonicalStation) + funFactPhrase + toGoMsg
}

function count (map) {
  return Object.keys(map).length
}
