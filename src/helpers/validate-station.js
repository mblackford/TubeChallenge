'use strict';

const { canonicalName } = require('./canonical-name');
const { getAllStations } = require('../stations/get-all-stations');

module.exports.validateStation = (canonicalStation) => {
  if (canonicalStation.length === 0) {
    return false;
  }

  // Get an array of all the station names
  const stationNames = Object.keys(getAllStations());

  // Canonicalise them
  const canonicalisedStations = stationNames.map(canonicalName);

  // Valid if in the list of canonicalised stations
  return canonicalisedStations.includes(canonicalStation);
}
