'use strict';

module.exports = async ({ strapi }) => {
  // bootstrap phase
  await strapi.plugin('aka-plugins').service('mainService').initializePlugin();
  await strapi.plugin('aka-plugins').service('aka-monitor').initializeMiddleware();
  await strapi.plugin('aka-plugins').service('aka-migration').syncMigration();
};