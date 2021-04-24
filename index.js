#!/usr/bin/env node
const { program } = require('commander')
const { helpOptions } = require('./lib/core/help')
const createCommands = require('./lib/core/create')
/**
 * 1.定义版本号，指令，帮助信息
 * 2.解析指令
 */
// 定义显示模板的版本号
program.version(require('./package.json').version)

// 帮助和可选信息
helpOptions()

// 创建其他指令
createCommands()

// 解析终端指令
program.parse(process.argv)
