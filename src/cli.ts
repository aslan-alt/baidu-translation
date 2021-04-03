import * as commander from "commander";
import { translation } from './main'
import * as querystring from 'querystring'

const program = new commander.Command()
const x = querystring.stringify({ q: 'new', sign: '1234' })
console.log(x)
program.version('0.0.1')
    .name('fy')
    .usage('<English or zh>')
    .arguments('<English>')
    .action((string) => {
        translation(string)
    })
program.parse(process.argv)