// https://zhuanlan.zhihu.com/p/65174076
// https://github.com/ElemeFE/element/blob/dev/build/md-loader/index.js

const containers = require('./containers')
const overWriteFenceRule = require('./fence')
const path = require('path')
const { hashCode, creatDemoComponent } = require('./utils')

module.exports = (options, ctx) => {
  return {
    name: 'md-demo-block',

    enhanceAppFiles: [
      path.resolve(__dirname, 'enhanceAppFile.js')
    ],
    // #region enhanceAppFiles
    // enhanceAppFiles() {
    //   return {
    //     name: 'dynamic-code',
    //     content: `
    //       import DemoBlock from '${path.resolve(__dirname, 'DemoBlock.vue')}'

    //       export default ({ Vue, router }) => {
    //         Vue.component('DemoBlock', DemoBlock)
    //       }
    //      `
    //   }
    // },
    // #endregion
    extendPageData($page) {
      let { _content: content, key, regularPath, relativePath } = $page
      if (typeof content === 'string') {
        let demoCodes = content.split(/:::/).filter(s => /^\s*demo/.test(s))
  
        demoCodes.forEach((code, index) => {
          const tagName = `demo-block-${hashCode(relativePath)}-${index}`
          creatDemoComponent(code, tagName)
        })
      }
    },

    extendMarkdown(md) {
      overWriteFenceRule(md)
      containers(md)
    }
  }
}
