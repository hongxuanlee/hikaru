require('shelljs/global');
config.fatal = true;
let config = require('../config/github.js');

let gitInit = (proj, options = {}) => {
  let gitUrl = `git@github.com:${config.user}/${proj}.git`;  
  let dir = options.dir || process.cwd();
}
