'use strict';

const funFacts = require('./fun-facts');

test('the file contains the required number of fun facts', () => {
  expect(Object.keys(funFacts)).toHaveLength(267);
});

test('select stations contain a fun fact', () => {
  expect(funFacts['St Paul\'s']).toEqual('During the Second World War, the electricity grid control room for the entire of London and Southeast England was housed here, in the lift shaft. (credit The Nudge)');
  expect(funFacts['Bank']).toEqual('Has the most entrances/exits of any tube station with 12. (credit The Nudge)');
  expect(funFacts['Chiswick Park']).toEqual('Once known as Acton Green – the name was changed due to there being 7 other Acton stations already. (credit The Nudge)');
});

test('every station credits The Nudge', () => {
  Object.keys(funFacts).forEach((stationName) => {
    expect(funFacts[stationName]).toContain('. (credit The Nudge)');
  });
});
