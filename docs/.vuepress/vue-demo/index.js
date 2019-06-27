// https://zhuanlan.zhihu.com/p/65174076
// https://github.com/ElemeFE/element/blob/dev/build/md-loader/index.js

const containers = require('./containers')
const overWriteFenceRule = require('./fence')
const { hashCode, creatDemoComponent, resolvePath } = require('./utils')

module.exports = (options, ctx) => {
  return {
    name: 'md-demo-block',

    async enhanceAppFiles() {
      return {
        name: 'dynamic-code',
        content: `
          const requireComponent = require.context('@dynamic/demo/', true, /.*.vue$/)
          export default ({ Vue, router }) => {
            Vue.component('DemoBlock', () => import('${resolvePath('DemoBlock.vue')}'))
            requireComponent.keys().forEach(fileName => {
              const componentConfig = requireComponent(fileName)
              const component = componentConfig.default
              Vue.component(fileName.match(/\\.\\/(.*)\\.vue/)[1], component)
            })
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
    },

    extendMarkdown(md) {
      overWriteFenceRule(md)
      containers(md, ctx)
    }
  }
}