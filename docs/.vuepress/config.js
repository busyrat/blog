const { genNavAndSidebar, DOCS_DIR } = require('./utils')
let { nav, sidebar } = genNavAndSidebar()

const navLinks = [
  {
    text: 'links',
    items: [{ text: 'blog github', link: 'https://github.com/busyrat/blog' }, { text: 'vuepress-plugins', link: 'https://github.com/busyrat/vuepress-plugins' }]
  }
]

nav = [...nav, ...navLinks]

module.exports = {
  base: '/blog/',
  dest: 'blog',
  port: 7070,
  title: 'busyrat blog',
  head: [['link', { rel: 'icon', href: `/pkq.png` }]],
  description: '找回写代码的乐趣',
  cache: false,
  themeConfig: {
    nav,
    sidebar,
    editLinks: true,
    lastUpdated: '上次更新',
    editLinkText: '在 GitHub 上编辑此页'
  },
  plugins: [
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: {
          message: 'blog 更新了',
          buttonText: '刷新'
        }
      }
    ]
  ]
}
