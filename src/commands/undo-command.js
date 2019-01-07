'use strict';

const { updateStations } = require('../dynamo/update-stations')
const { getRecord } = require('../dynamo/get-record')
const { canonicalName } = require('../helpers/canonical-name');

module.exports.undoCommand = async (phoneNumber, station) => {
  // Get the user and check if they exist
  const user = await getRecord(phoneNumber);
  if (!user) {
    return `You are not registered for the Tube Challenge. Text "JOIN <Your Name>" to register.`;
  }

  // Get the canonicalised version of the station
  const canonicalStation = canonicalName(station);

  // Get the current visited stations (default to empty array)
  const visitedStations = user.stations || [];

  // Does the list already contain the station?
  const previousVisits = visitedStations.filter(item => item.station === canonicalStation);
  if (previousVisits.length === 0) {
    return `You haven't previously visited ${station}.`;
  }

  // Filter out the visit to the station
  const updatedStations = visitedStations.filter(item => item.station !== canonicalStation);

  // Save the user record
  await updateStations(phoneNumber, updatedStations);

  // Return the response
  return `Visit to ${station} has been forgotten.`;
}
