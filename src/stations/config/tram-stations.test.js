'use strict';

const tramStations = require('./tram-stations');

test('the file contains the required number of stations', () => {
  expect(Object.keys(tramStations)).toHaveLength(39);
});

test('select stations contain the right number of lines', () => {
  expect(tramStations['Arena']).toHaveLength(1);
  expect(tramStations['Wimbledon']).toHaveLength(1);
  expect(tramStations['Mitcham Junction']).toHaveLength(1);
});
