'use strict';

global.WEBPACK_BUNDLE = false;

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  // application specific logging, throwing an error, or other logic here
})

const config = require('./config');
const logger = require('./core/logger');
const moment = require('moment');
const chalk = require('chalk');

logger.info();
logger.info(chalk.bold('---------------------[ Server starting at %s ]---------------------------'), moment().format('YYYY-MM-DD HH:mm:ss.SSS'));
logger.info();

logger.info(chalk.bold('Application root path: ') + global.rootPath);

const init = require('./core/init');
const db = require('./core/mongo')();
const app = require('./core/express')(db);


require('./libs/gracefulExit');

app.listen(config.port, config.ip, function() {

  logger.info('');
  logger.info(config.app.title + ' v' + config.app.version + ' application started!');
  logger.info('----------------------------------------------');
  logger.info('Environment:\t' + chalk.underline.bold(process.env.NODE_ENV));
  logger.info('IP:\t\t' + config.ip);
  logger.info('Port:\t\t' + config.port);
  logger.info('Database:\t\t' + config.db.uri);
  logger.info('Redis:\t\t' + (config.redis.enabled ? config.redis.uri : 'Disabled'));
  logger.info('');

  require('./libs/sysinfo')();

  logger.info('----------------------------------------------');

  let Service = require('./core/services');
  if (config.isDevMode)
    Service.printServicesInfo();
});


exports = module.exports = app;
