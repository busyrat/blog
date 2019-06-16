// https://zhuanlan.zhihu.com/p/65174076
// https://github.com/ElemeFE/element/blob/dev/build/md-loader/index.js

const containers = require('./containers')
const overWriteFenceRule = require('./fence')
const path = require('path')
const { hashCode, creatDemoComponent, resolvePath, fs } = require('./utils')

const getDemoComponents = (isContainConent) => {
  return new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      if (global.end) {
        let demoComponents = fs.readdirSync(resolvePath('../components'))

        if (isContainConent) {
          demoComponents = demoComponents.map(name => {
            return {
              name,
              content: fs.readFileSync(resolvePath('../components/' + name)).toString()
            }
          })
        } else {
          demoComponents = demoComponents.map(name => name.slice(0, -4))
        }

        resolve(demoComponents)
        clearInterval(timer)
      }
    }, 10)
  })
}

module.exports = (options, ctx) => {
  return {
    name: 'md-demo-block',

    async enhanceAppFiles() {
      let demoComponentsName = await getDemoComponents()
      let componentRegisterStr = demoComponentsName.map(componentName => {
        return `Vue.component('${componentName}', () => import('@dynamic/${componentName}'))\n`
      }).join('')
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

    async clientDynamicModules() {

      let demoComponents = await getDemoComponents(true /**isContainConent */)
      return demoComponents
    },

    extendPageData($page) {
      let { _content: content, key, regularPath, relativePath } = $page

      if (typeof content === 'string') {
        let demoCodes = content.split(/:::/).filter(s => /^\s*demo/.test(s))

        demoCodes.forEach((code, index) => {
          const tagName = `demo-block-${hashCode(relativePath)}-${index}`
          creatDemoComponent(code, tagName)
        })
      }
      if (/end.md/.test(relativePath)) {
        global.end = true
      }
    },

    extendMarkdown(md) {
      overWriteFenceRule(md)
      containers(md)
    }
  }
}
