const { promisify } = require('util')
const download = promisify(require('download-git-repo'))
const { vueRepo } = require('../config/repo-config')
const { commandSpawn } = require('../utils/terminal')
const open = require('open')

const createProjectActions = async (project) => {
  console.log("code-md helps you create your project~")
  try {
    // 1.clone项目  使用 download-git-repo 库
    await download(vueRepo, project, { clone: true })
    // 2.执行  npm install 安装项目依赖
    const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
    await commandSpawn(npm, ['install'], { cwd: `./${project}` })
    // 3.打开浏览器
    open('http://localhost:8080/')
    // 4.运行npm run serve
    commandSpawn(npm, ['run', 'serve'], { cwd: `./${project}` })
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createProjectActions
}