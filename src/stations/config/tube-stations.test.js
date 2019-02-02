'use strict';

const tubeStations = require('./tube-stations');

test('the file contains the required number of stations', () => {
  expect(Object.keys(tubeStations)).toHaveLength(269);
});

test('select stations contain the right number of lines', () => {
  expect(tubeStations['Chiswick Park']).toHaveLength(1);
  expect(tubeStations['Baker Street']).toHaveLength(5);
  expect(tubeStations["King's Cross St Pancras"]).toHaveLength(6);
});
