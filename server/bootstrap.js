'use strict';

module.exports = async ({ strapi }) => {
  // bootstrap phase
  await strapi.plugin('strapi-plugin-akatecnologia').service('mainService').initializePlugin();
  await strapi.plugin('strapi-plugin-akatecnologia').service('aka-monitor').initializeMiddleware();
  await strapi.plugin('strapi-plugin-akatecnologia').service('aka-migration').syncMigration();
};