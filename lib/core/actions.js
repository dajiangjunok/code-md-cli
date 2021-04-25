const { promisify } = require('util')
const path = require('path');
const download = promisify(require('download-git-repo'))
const { vueRepo } = require('../config/repo-config')
const { commandSpawn } = require('../utils/terminal')
const { compile, writeToFile, createDirSync } = require('../utils/utils')
const open = require('open')

const createProjectAction = async (project) => {
  console.log("\x1B[36m%s\x1B[0m", "code-md helps you create your project~")
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

// 添加组件的action
const addComponentAction = async (name, dest) => {
  // 1.编译ejs模板 result
  const result = await compile("vue-component.ejs", { name, lowerName: name.toLowerCase() })

  // 2.写入文件的操作
  const targetPath = path.resolve(dest, `${name}.vue`)
  console.log(targetPath)
  writeToFile(targetPath, result)
}

// // 添加组件和路由action
// const addPageAndRouterAction = async (name, dest) => {

// }

// // 添加store action
// const addStoreAction = async (name, dest) => {

// }

module.exports = {
  createProjectAction,
  addComponentAction,
  // addPageAndRouterAction,
  // addStoreAction
}