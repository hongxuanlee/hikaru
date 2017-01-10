const path = require('path');
const git = require('./git');
const skeleton = require('./skeleton');
const assert = require('assert');
const conf = require('../config/github');
const logger = require('./logger');

module.exports = (options = {}) => {
  let name = options.name;
  assert(name, 'project name required');
  let prefix = options.prefix || conf.user;
  let description = options.description || '';
  let cwd = process.cwd();
  const params = {
    name,
    prefix,
    description,
    user: conf.user,
    email: conf.email
  };
  git(params);
  if(options.type){
    let projPath = path.join(cwd, name);
    logger.info(`start generator ${options.type} project`);
    skeleton(options.type, {
      name,
      prefix,
      description,
      user: conf.user
    }, projPath).then(() => {
      logger.info('done!'); 
    }).catch(e => {
      logger.error(e);
    });
  }else{
    logger.info('done!');
  }
};
