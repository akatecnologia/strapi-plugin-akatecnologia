'use strict';

/**
 *  service.
 */

const path = require('path');
const fs = require('fs')

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('plugin::strapi-plugin-akatecnologia.aka-migration', ({ strapi }) =>  ({

    initializeMiddleware: async () => {
        
        strapi.server.use(async (ctx, next) => {
            try {
                await next();
            } catch (error) {
                throw error;
            }    
        });
    },

    reportError: async (error) => {
        
        
    },

}))
