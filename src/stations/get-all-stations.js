'use strict';

const merge = require('deepmerge');

const tubeStations = require('./config/tube-stations');
const dlrStations = require('./config/dlr-stations');
const overgroundStations = require('./config/overground-stations');
const tflRailStations = require('./config/tfl-rail-stations');
const tramStations = require('./config/tram-stations');

module.exports.getAllStations = () => merge.all([
  tubeStations, 
  dlrStations, 
  overgroundStations, 
  tflRailStations, 
  tramStations
])
