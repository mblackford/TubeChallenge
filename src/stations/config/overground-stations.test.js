const overgroundStations = require('./overground-stations');

test('the file contains the required number of stations', () => {
  expect(Object.keys(overgroundStations)).toHaveLength(110);
});

test('select stations contain the right number of lines', () => {
  expect(overgroundStations['Clapham Junction']).toHaveLength(1);
  expect(overgroundStations['Willesden Junction']).toHaveLength(1);
  expect(overgroundStations['Kensal Rise']).toHaveLength(1);
  expect(overgroundStations['Liverpool Street']).toHaveLength(1);
});
