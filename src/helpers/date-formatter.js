'use strict';

module.exports.dateFormatter = (timestamp) => {
  // Parse the timestamp
  const date = new Date(timestamp);

  // Format and return the date
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
}
