const { getAllLines } = require('./get-all-lines');

test('the correct number of lines is loaded', () => {
  const allLines = getAllLines();
  expect(Object.keys(allLines)).toHaveLength(16);
});

test('select stations contain the right number of lines', () => {
  const allLines = getAllLines();
  expect(allLines['District']).toHaveLength(60);
  expect(allLines['DLR']).toHaveLength(45);
  expect(allLines['Waterloo and City']).toHaveLength(2);
  expect(allLines['Overground']).toHaveLength(111);
  expect(allLines['TFL Rail']).toHaveLength(23);
  expect(allLines['London Trams']).toHaveLength(39);
});
