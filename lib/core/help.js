const program = require('commander')
// 添加其他选项
const helpOptions = () => {
  program.option('-w --codeyj', 'a codeyj option')

  program.option('-s --src <src>', 'a source folder')
  program.option('-d --dest <dest>', 'a destination folder,例如: -d src/pages, 错误: /src/pages')
  program.option('-f --framework <framework>', 'your framework name')

  program.on('--help', () => {
    console.log("")
    console.log("usage")
    console.log("  coderyj -v")
    console.log("  coderyj -version")
  })
}

module.exports = { helpOptions }