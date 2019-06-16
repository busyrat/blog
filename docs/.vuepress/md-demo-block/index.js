// https://zhuanlan.zhihu.com/p/65174076
// https://github.com/ElemeFE/element/blob/dev/build/md-loader/index.js

const containers = require('./containers')
const overWriteFenceRule = require('./fence')
const path = require('path')
const fs = require('fs')
const { hashCode, creatDemoComponent, creatTempDemoComponent, resolvePath } = require('./utils')

module.exports = (options, ctx) => {

  const getDemoComponents = () => {
    return new Promise((resolve, reject) => {
      const timer = setInterval(() => {
        if (global.end) {
          let demoComponents = fs.readdirSync(path.resolve(ctx.tempPath, 'dynamic') ).map(name => name.slice(0, -4))
  
          resolve(demoComponents)
          clearInterval(timer)
        }
      }, 10)
    })
  }

  return {
    name: 'md-demo-block',

    async enhanceAppFiles() {
      let componentRegisterStr = ''
      if (process.env.NODE_ENV === 'memory') {
        let demoComponentsName = await getDemoComponents()
        componentRegisterStr = demoComponentsName.map(componentName => {
          return `Vue.component('${componentName}', () => import('@dynamic/${componentName}'))\n`
        }).join('')
      }
    
      return {
        name: 'dynamic-code',
        content: `
          export default ({ Vue, router }) => {
            Vue.component('DemoBlock', () => import('${ resolvePath('DemoBlock.vue')}'))

            ${componentRegisterStr}
          }
         `
      }
    },

    extendPageData($page) {

      let { _content: content, key, regularPath, relativePath } = $page

      if (typeof content === 'string') {
        let demoCodes = content.split(/:::/).filter(s => /^\s*demo/.test(s))

        demoCodes.forEach((code, index) => {
          const tagName = `demo-block-${hashCode(relativePath)}-${index}`
          creatDemoComponent(ctx, code, tagName)
        })
      }
      if (process.env.NODE_ENV === 'memory') {
        if (/end.md/.test(relativePath)) {
          global.end = true
        }
      }
    },

    extendMarkdown(md) {
      overWriteFenceRule(md)
      containers(md, ctx)
    }
  }
}
