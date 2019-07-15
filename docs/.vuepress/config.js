const { genNavAndSidebar, DOCS_DIR } = require('./utils')
module.exports = {
  base: '/blog/',
  dest: 'blog',
  port: 7070,
  title: 'busyrat blog',
  head: [['link', { rel: 'icon', href: `/pkq.png` }]],
  description: '找回写代码的乐趣',
  cache: false,
  themeConfig: {
    ...genNavAndSidebar({ github: true }),

    editLinks: true,
    lastUpdated: '上次更新',
    editLinkText: '在 GitHub 上编辑此页'
  },
  plugins: [
    [require('./vuese-vue-demo'), { navIndex: -1, entry: DOCS_DIR('../src/component'), edit: false }],
    require('./vue-demo')
  ]
}
