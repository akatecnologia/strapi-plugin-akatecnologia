'use strict';

const mainService = require('./main-service');
const akaBackup = require('./aka-backup');
const akaMigration  = require('./aka-migration');
const akaMonitor  = require('./aka-monitor');

module.exports = {
  mainService,
  'aka-backup': akaBackup,
  'aka-migration': akaMigration,
  'aka-monitor': akaMonitor
};