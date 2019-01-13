const { buildStatus, buildExtendedStatus } = require('./build-status');

test('no lines visited', () => {
  const visitedStations = [];
  const status = buildStatus(visitedStations);
  expect(status).toEqual('You have visited 0 out of 443 stations (0%).');
});

test.skip('one station on the District Line visited', () => {
  const visitedStations = [{'Chiswick Park': 1546732326935}];
  const status = buildExtendedStatus(visitedStations);
  expect(status).toContain('You have visited 1 out of 443 stations (0%).');
  expect(status).toContain('District: 1 out of 269 stations (0%).');
});
