// https://zhuanlan.zhihu.com/p/65174076
// https://github.com/ElemeFE/element/blob/dev/build/md-loader/index.js

const containers = require('./containers')
const overWriteFenceRule = require('./fence')
const path = require('path')

module.exports = (options, ctx) => {
  return {
    name: 'md-demo-block',

    // enhanceAppFiles: [
    //   path.resolve(__dirname, 'enhanceAppFile.js')
    // ],
    enhanceAppFiles() {
      return {
        name: 'dynamic-code',
        content: `
          import DemoBlock from '${path.resolve(__dirname, 'DemoBlock.vue')}'

          export default ({ Vue, router }) => {
            Vue.component('DemoBlock', DemoBlock)
          }
         `
      }
    },

    extendMarkdown(md) {
      overWriteFenceRule(md)
      containers(md)
    }
  }
}
