#!/usr/bin/env node
/**
 * Created by shilei13 on 2020/5/25.
 */
const shell = require('shelljs');// 执行文件操作
const argv = require('yargs').argv; // yargs 处理参数
const code = argv._[0]
const commit = argv._[1]
const content = argv._[2]
function helpInfo() {
    let helpStr = '[h] 帮助信息\n[a] 新功能，提交默认前缀 [add],示例：\'npm run auto-git a 新增XX功能 新功能描述\'，\n[c] 修改功能，提交默认前缀 [change]\n[f] 修复问题，提交默认前缀 [fix]'
    console.log(helpStr)
}
let message = ''
switch(code){
    case 'h':
        helpInfo();
        break;
    case 'a':
        if(!!commit){
            message+='add '+commit
            if(!!content){
                message+="\n"+content
            }
        }else{
            helpInfo();
        };
        break;
    case 'c':
        if(!!commit){
            message+='change '+commit
            if(!!content){
                message+="\n"+content
            }
        }else{
            helpInfo();
        };
        break;
    case 'f':
        if(!!commit){
            message+='fix '+commit
            if(!!content){
                message+="\n"+content
            }
        }else{
            helpInfo();
        };
        break;
    default:
        helpInfo();
}
// 执行git提交命令
if(!!message){
    console.log(message)
    shell.exec(`git pull`)
shell.exec('git add .')
shell.exec(`git commit -m "${commit}"`)
shell.exec(`git pull`)
shell.exec('git push')
}