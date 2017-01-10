const logger = require('./logger');

exports.run = (command) => {
  logger.info(`[cmd]: ${command}`);
  exec(command);
};

