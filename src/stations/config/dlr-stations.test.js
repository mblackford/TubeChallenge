'use strict';

const dlrStations = require('./dlr-stations');

test('the file contains the required number of stations', () => {
  expect(Object.keys(dlrStations)).toHaveLength(45);
});

test('select stations contain the right number of lines', () => {
  expect(dlrStations['Deptford Bridge']).toHaveLength(1);
  expect(dlrStations['Bank']).toHaveLength(1);
  expect(dlrStations['Shadwell']).toHaveLength(1);
  expect(dlrStations['Woolwich Arsenal']).toHaveLength(1);
});
