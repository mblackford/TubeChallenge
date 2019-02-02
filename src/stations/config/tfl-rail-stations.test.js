'use strict';

const tflRailStations = require('./tfl-rail-stations');

test('the file contains the required number of stations', () => {
  expect(Object.keys(tflRailStations)).toHaveLength(23);
});

test('select stations contain the right number of lines', () => {
  expect(tflRailStations['Brentwood']).toHaveLength(1);
  expect(tflRailStations['Manor Park']).toHaveLength(1);
  expect(tflRailStations['Stratford']).toHaveLength(1);
});
