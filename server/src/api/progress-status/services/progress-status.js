'use strict';

/**
 * progress-status service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::progress-status.progress-status');
