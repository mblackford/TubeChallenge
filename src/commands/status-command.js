'use strict'

const { getRecord } = require('../dynamo/get-record')
const status = require('../helpers/status')

module.exports.statusCommand = async (phoneNumber) => {
  // Get the user and check if they exist
  const user = await getRecord(phoneNumber)
  if (!user) {
    return `You are not registered for the Tube Challenge. Text "JOIN <Your Name>" to register.`
  }

  // Get the current visited stations (default to empty array)
  const visitedStations = user.stations || []

  // Return the response
  const visitedStationList = visitedStations.filter(record => record.station)
  return status.all(visitedStationList)
}
