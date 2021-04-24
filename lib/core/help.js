const { program } = require('commander')
// 添加其他选项
const helpOptions = () => {
  program.option('-w --code-md', 'a coderwang option')

  program.option('-s --src <src>', 'a source folder')
  program.option('-d --dest <dest>', 'a destination folder,例如: -d src/pages, 错误: /src/pages')
  program.option('-f --framework <framework>', 'your framework name')

  program.on('help', () => {
    console.log("")
    console.log("usage")
    console.log("  code-md -v")
    console.log("  code-md -version")
  })
}

module.exports = { helpOptions }