'use strict';

const { getAllStations } = require('./get-all-stations');

test('the correct number of stations is loaded', () => {
  expect(Object.keys(getAllStations())).toHaveLength(444);
});

test('select stations contain the right number of lines', () => {
  const allStations = getAllStations();
  expect(allStations['Chiswick Park']).toHaveLength(1);
  expect(allStations['Stratford']).toHaveLength(5);
  expect(allStations['Bank']).toHaveLength(4);
  expect(allStations['Canada Water']).toHaveLength(2);
  expect(allStations['Wimbledon']).toHaveLength(2);
  expect(allStations['Liverpool Street']).toHaveLength(6);
  expect(allStations['Brondesbury Park']).toHaveLength(1);
});
