'use strict';

/**
 *  service.
 */

const path = require('path');
const fs = require('fs')

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('plugin::aka-plugins.aka-migration', ({ strapi }) =>  ({

    syncMigration: async () => {
        
        const migrationPath = `${path.resolve("./")}/private/migrations/`; 
        const migrationFolders = fs.readdirSync(migrationPath)

        for await(const migrationName of migrationFolders) {

            if (await strapi.plugin('aka-plugins').service('aka-migration').alreadyMigrated(migrationName))
                continue;
            
            console.log(`MIGRATION - Executando ${migrationName}`)
            await strapi.plugin('aka-plugins').service('aka-migration').doMigrate(migrationName);
            await strapi.plugin('aka-plugins').service('aka-migration').saveMigration(migrationName);
            console.log(`MIGRATION - Fim da Execução ${migrationName}`)
        }
    },

    doMigrate: async (migrationName) => {
        const migrationPath = `${path.resolve("./")}/private/migrations/${migrationName}`; 
        const migrationModule = require(migrationPath);

        await migrationModule.execute();
    },
 
    alreadyMigrated: async (migrationName) => {

        const migration = await strapi.query('plugin::aka-plugins.aka-migration').findOne({
            where: { 
              Name: migrationName
            }
        });

        return migration !== null;
    },

    saveMigration: async (migrationName) => {

        await strapi.query('plugin::aka-plugins.aka-migration').create({
            data: {
                Name:migrationName,
                When: new Date()
            }
        });
    }
}))
