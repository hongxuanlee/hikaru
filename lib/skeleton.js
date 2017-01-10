const path = require('path');
const {
  stat,
  readFile,
  writeFile
} = require('mz/fs');
const logger = require('./logger');
const {
  run
} = require('./utils');
require('shelljs/global');
config.fatal = true;

let generater = (content, data) => {
  return content.replace(/\{\{(.*?)\}\}/g, (item, match) => {
    return data[match] || '';
  });
};

let replaceFile = (p, dir, data) => {
  let rPath = path.join(dir, p);
  logger.info(`replace file [${rPath}]`);
  return readFile(rPath, 'utf8').then(content => {
    let result = generater(content, data);
    return writeFile(rPath, result, 'utf8');
  });
};

let replaceFiles = (dir, data) => {
  let rps = ['README.md', '.travis.yml', 'package.json'];
  return Promise.all(rps.map(rp => replaceFile(rp, dir, data)));
};

let selector = (type, tarPath) => {
  const copyPath = path.join(__dirname, '../skeleton/', type);
  return stat(copyPath).then(iD => {
    if (!iD) {
      throw new Error(`not such type skeleton [${type}]`);
    }
    run(`cp -r ${copyPath}/. ${tarPath}`);
  });
};

let main = (type, data, tarPath) => {
  tarPath = tarPath || path.join(process.cwd(), data.name);
  return selector(type, tarPath).then(() => {
    return replaceFiles(tarPath, data).then(() => {
      cd(tarPath);
      run('proxychains4 npm install');
    });
  });
};

module.exports = main;
