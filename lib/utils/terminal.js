/**
 * 执行终端相关的代码
 * 使用子进程模块
 * 当前进程是在执行js代码，我们需要在另一个进程进行这个任务
 * 通过exec   spawn   //exec是对spawn 的封装，spawn偏底层一些  用于执行一些子进程
 */
const { spawn } = require('child_process')

/**
 * 
 * @param  {...any} args 
 * @returns 
 */
const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    // 进程中会有很多执行命令的过程中的打印信息
    const childProcess = spawn(...args)
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)
    childProcess.on('close', () => {
      resolve()
    })
  })
}

module.exports = {
  commandSpawn
}