require('shelljs/global');
config.fatal = true;
const config = require('../config/github.js');
const path = require('path');
const logger = require('./logger');

let run = (command) => {
  logger.info(`[cmd]: ${command}`);
  exec(command);
}

let gitInit = (proj, options = {}) => {
  let gitUrl = `git@github.com:${config.user}/${proj}.git`;  
  let dir = options.dir || process.cwd();
  run(`git clone ${gitUrl}`);
  cd(path.join(dir, proj)); 
  run(`git config user.email ${config.email}`);  
  run(`git config user.name ${config.user}`);
}



