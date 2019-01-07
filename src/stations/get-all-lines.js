'use strict';

const merge = require('deepmerge');

const { getAllStations } = require('./get-all-stations');

module.exports.getAllLines = () => {
  const allStations = getAllStations();
  const stationNames = Object.keys(allStations);

  let lines = {};
  stationNames.forEach(station => {
    allStations[station].forEach(line => {
      lines[line] = [station, ...(lines[line] || [])];
    });
  });

  return lines;
}
