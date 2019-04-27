'use strict'

const { getRecord } = require('../dynamo/get-record')
const { buildExtendedStatus } = require('../helpers/build-status')

module.exports.statusCommand = async (phoneNumber, station) => {
  // Get the user and check if they exist
  const user = await getRecord(phoneNumber)
  if (!user) {
    return `You are not registered for the Tube Challenge. Text "JOIN <Your Name>" to register.`
  }

  // Get the current visited stations (default to empty array)
  const visitedStations = user.stations || []

  // Return the response
  return buildExtendedStatus(visitedStations)
}
