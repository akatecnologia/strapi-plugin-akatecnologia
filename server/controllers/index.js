'use strict';

const mainController = require('./main-controller');
const akaBackup = require('./aka-backup');
const akaMigration = require('./aka-migration');

module.exports = {
  mainController,
  'aka-backup': akaBackup,
  'aka-migration': akaMigration
};

