const containers = require('./containers')
const overWriteFenceRule = require('./fence')
const path = require('path')

module.exports = (options, ctx) => {
  return {
    name: 'md-demo-block',

    extendMarkdown(md) {
      overWriteFenceRule(md)
      containers(md)
      // https://zhuanlan.zhihu.com/p/65174076
      // https://github.com/ElemeFE/element/blob/dev/build/md-loader/index.js
    }
  }
}
