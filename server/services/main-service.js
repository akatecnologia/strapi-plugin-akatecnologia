'use strict';

const fs = require('fs');
const path = require('path');

module.exports = ({ strapi }) => ({

  initializePlugin() {

    const privatePath = `${path.resolve("./")}/private`; 
    if (!fs.existsSync(privatePath)) fs.mkdirSync(privatePath);
    
    const migrationsPath = `${path.resolve("./")}/private/migrations`; 
    if (!fs.existsSync(migrationsPath)) fs.mkdirSync(migrationsPath);

    const backupsPath = `${path.resolve("./")}/private/backups`; 
    if (!fs.existsSync(backupsPath)) fs.mkdirSync(backupsPath);

    const firstMigrationPath = `${path.resolve("./")}/private/migrations/1900-01-01 AKA Plugins Installation`; 
    if (!fs.existsSync(firstMigrationPath)) {
      fs.mkdirSync(firstMigrationPath);
      fs.copyFileSync( `${__dirname}/migrationExample.js`, `${firstMigrationPath}/index.js`);
      fs.copyFileSync( `${__dirname}/migrationExample.sqlfile`, `${firstMigrationPath}/query.sqlfile`);
    }
   


  },
});
