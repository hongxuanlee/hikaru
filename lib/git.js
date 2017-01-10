require('shelljs/global');
config.fatal = true;
const path = require('path');
const {run} = require('./utils.js');

let gitInit = (options = {}) => {
  let gitUrl = `git@github.com:${options.prefix}/${options.name}.git`;  
  let dir = options.dir || process.cwd();
  run(`git clone ${gitUrl}`);
  cd(path.join(dir, options.name)); 
  run(`git config user.email ${options.email}`);  
  run(`git config user.name ${options.user}`);
};

module.exports = gitInit;

