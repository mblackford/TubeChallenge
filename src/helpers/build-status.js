'use strict';

const { getAllStations } = require('../stations/get-all-stations');
const { getAllLines } = require('../stations/get-all-lines');

module.exports.buildStatus = (visitedStations) => {
  const allStations = getAllStations();
  const totalCount = count(allStations);
  const visitCount = count(visitedStations);
  const totalPercent = Math.round(100 * (visitCount / totalCount));

  return `You have visited ${visitCount} out of ${totalCount} stations (${totalPercent}%).`;
}

module.exports.buildExtendedStatus = (visitedStations) => {
  const summaryStatus = module.exports.buildStatus(visitedStations);
  
  // Create a map of lines and the number of stations in each
  const allLines = getAllLines();  
  const lineNames = Object.keys(allLines);

  const lineCounts = {};
  lineNames.forEach(lineName => {
    allLines[lineName].forEach(line => {
      lineCounts[lineName] = {count: 0, total: line.length};
    });
  });

  return JSON.stringify(visitedStations);
}

function count(map) {
  return Object.keys(map).length;
}
