"use strict";
import _ from 'lodash'
import { exec } from 'child_process'
import path from 'path'
import fs from 'fs'

export default {
  bind: (fpm) => {
    fpm.registerAction('BEFORE_MODULES_ADDED', (args) => {
      let biz = args[0]
      const c = fpm.getConfig()
      biz.m = _.assign(biz.m, {
        script: {
          python: async (arg) =>{
            /**
             * arg: {
             * project: '',
             * script: '',
             * params: [],
             * }
             */
            const projectRoot = c.pythonDir || ''
            const project = arg.project
            const script = arg.script
            let scriptPath = path.join(projectRoot, project, script)
            if(!fs.existsSync(scriptPath)){
              return {
                code: -1,
                message: 'script file not exists!'
              }
            }
            const params = arg.params || []
            let paramStr = params.join(' ')
            return new Promise( (rs, rj) => {
              exec(`python ${scriptPath} ${paramStr}`, (err, stdout, stderr) => {
                if(err) {
                  rj(err)
                  return
                }
                if(stdout.length >1){
                  let str = stdout.toString()
                  
                  rs({
                    data: JSON.parse(str)
                  })
                } else {
                  rs({
                    data: {}
                  })
                }
              })
            })
            
          }
        }
      })
      
    })
  }
}
