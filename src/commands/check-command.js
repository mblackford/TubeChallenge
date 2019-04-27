'use strict'

const { getRecord } = require('../dynamo/get-record')
const { canonicalName } = require('../helpers/canonical-name')
const { validateStation } = require('../helpers/validate-station')
const { dateFormatter } = require('../helpers/date-formatter')

module.exports.checkCommand = async (phoneNumber, rawStation) => {
  // Get the user and check if they exist
  const user = await getRecord(phoneNumber)
  if (!user) {
    return `You are not registered for the Tube Challenge. Text "JOIN <Your Name>" to register.`
  }

  // Get the canonicalised version of the station
  const stationKey = canonicalName(rawStation)

  // Check if it's a valid station
  const validatedStation = validateStation(stationKey)
  if (!validatedStation) {
    return `${rawStation} is not a valid station on the TFL map.`
  }

  // Get the current visited stations (default to empty array)
  const visitedStations = user.stations || []

  // Does the list already contain the station?
  const previousVisits = visitedStations.filter(item => item.station === stationKey)
  if (previousVisits.length > 0) {
    const visitDate = dateFormatter(previousVisits[0].visitedAt)
    return `You visited ${validatedStation.name} on ${visitDate}.`
  } else {
    return `You haven't visited ${validatedStation.name} yet.`
  }
}
