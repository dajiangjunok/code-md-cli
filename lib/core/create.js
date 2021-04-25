const { program } = require('commander')
// const { createProjectAction, addComponentAction, addPageAndRouterAction, addStoreAction } = require('./actions')
const { createProjectAction, addComponentAction } = require('./actions')

const createCommands = () => {
  /**
   * command：指令
   * description: 描述
   * action：操作
   */
  // 1.创建项目的指令
  program
    .command('create <project> [others...]')
    .description('clone a repository into a folder')
    .action(project => createProjectAction(project))

  // 2.创建组件的指令
  program
    .command('addcpn <name>')
    .description('add vue component, example: code-md addcpn NavBar [-d src/components]')
    .action(name => addComponentAction(name, program.dest || 'src/components'))

  // // 3.创建页面的指令
  // program
  //   .command('addpage <name>')
  //   .description('add vue page, example: code-md addpage Home [-d src/components]')
  //   .action(name => addPageAndRouterAction(name, program.dest || `src/pages/${name.toLowerCase()}`))

  // // 4.创建store的指令
  // program
  //   .command('addstore <name>')
  //   .description('add vue store, example: code-md addstore favor [-d dest]')
  //   .action(name => addStoreAction(name, program.dest || `src/store/modules/${name.toLowerCase()}`))
}

module.exports = createCommands