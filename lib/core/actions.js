const { promisify } = require('util');
const path = require('path');
const fs = require('fs');

const program = require('commander');
const downloadRepo = promisify(require('download-git-repo'));
const open = require('open');

const log = require('../utils/log');
const terminal = require('../utils/terminal');
const { ejsCompile, writeFile, mkdirSync } = require('../utils/file');
const repoConfig = require('../config/repo-config');

const createProject = async (project, otherArg) => {
  // 1.提示信息
  log.hint('coderyj helps you create your project, please wait a moment~');

  // 2.clone项目从仓库
  await downloadRepo(repoConfig.vueGitRepo, project, { clone: true });

  // 3.执行终端命令npm install
  // terminal.exec('npm install', {cwd: `./${project}`});
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  await terminal.spawn(npm, ['install'], { cwd: `./${project}` });

  // 4.打开浏览器
  open('http://localhost:8080/');

  // 5.运行项目
  await terminal.spawn(npm, ['run', 'serve'], { cwd: `./${project}` });
}

const handleEjsToFile = async (name, dest, template, filename) => {
  // 1.获取模块引擎的路径
  const templatePath = path.resolve(__dirname, template);
  const result = await ejsCompile(templatePath, { name, lowerName: name.toLowerCase() });

  // 2.写入文件中
  // 判断文件不存在,那么就创建文件
  mkdirSync(dest);
  const targetPath = path.resolve(dest, filename);
  writeFile(targetPath, result);
}

const addComponent = async (name, dest) => {
  handleEjsToFile(name, dest, '../templates/vue-component.ejs', `${name}.vue`);
}

const addPage = async (name, dest) => {
  addComponent(name, dest);
  handleEjsToFile(name, dest, '../templates/vue-router.ejs', 'router.js')
}

const addStore = async (name, dest) => {
  handleEjsToFile(name, dest, '../templates/vue-store.ejs', 'index.js')
  handleEjsToFile(name, dest, '../templates/vue-types.ejs', 'types.js')
}

module.exports = {
  createProject,
  addComponent,
  addPage,
  addStore
}