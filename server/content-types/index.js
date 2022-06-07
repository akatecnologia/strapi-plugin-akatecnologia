'use strict';

const akaBackup = require('./aka-backup/schema');
const akaMigration = require('./aka-migration/schema');

module.exports = {
    'aka-backup': { schema: akaBackup },
    'aka-migration': { schema: akaMigration }
}; 
