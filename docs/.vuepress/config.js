const { genNavAndSidebar } = require('./utils')
module.exports = {
  base: '/blog/',
  dest: 'blog',
  port: 7070,
  title: 'busyrat blog',
  head: [['link', { rel: 'icon', href: `/pkq.png` }]],
  description: '找回写代码的乐趣',
  cache: false,
  themeConfig: {
    // ...genNavAndSidebar(),

    editLinks: true,
    lastUpdated: '上次更新',
    editLinkText: '在 GitHub 上编辑此页'
  },
  plugins: [
    [
      require('./vue-demo'),
      {
        vuese: true
      }
    ]
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
