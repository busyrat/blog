const { genNavAndSidebar } = require('./utils')
module.exports = {
  base: '/blog/',
  title: 'busyrat blog',
  dest: 'blog',
  port: 7070,
  cache: false,
  themeConfig: {
    ...genNavAndSidebar(),

    editLinks: true,
    lastUpdated: '上次更新',
    editLinkText: '在 GitHub 上编辑此页'
  },
  plugins: [
    require("./md-demo-block")
    // 这个插件对两个拥有 script 的 demo 不友好
    // [
    //   'demo-code',
    //   {
    //     onlineBtns: {
    //       codepen: false,
    //       jsfiddle: false,
    //       codesandbox: false
    //     },
    //     minHeight: 0
    //   }
    // ]
  ]
}
