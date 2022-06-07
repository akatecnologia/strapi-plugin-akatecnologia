'use strict';

module.exports = async ({ strapi }) => {
  // bootstrap phase
  await strapi.plugin('aka-plugins').service('mainService').initializePlugin();
  await strapi.plugin('aka-plugins').service('akaMonitor').initializeMiddleware();
  await strapi.plugin('aka-plugins').service('akaMigration').syncMigration();
};