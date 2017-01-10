const chalk = require('chalk');
let getLogger = () => {
  function log(color, msg) {
    console.log(chalk[color](msg));
  }
  return {
    info: msg => log('green', msg),
    warn: msg => log('yellow', msg),
    error: msg => log('red', msg)
  };
};

module.exports = getLogger();
