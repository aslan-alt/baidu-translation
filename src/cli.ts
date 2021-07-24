#!/usr/bin/env node
import * as commander from "commander";
import { translation } from './main'

const program = new commander.Command()
program.version('0.0.1')
    .name('fy')
    .usage('<English or zh>')
    .arguments('<English>')
    .action((string) => {
        translation(string)
    })
program.parse(process.argv)