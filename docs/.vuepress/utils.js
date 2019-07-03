const glob = require('glob')
const path = require('path')
const fs = require('fs')

const DOCS_DIR = (dir = '') => path.join(__dirname, '../', dir).replace(/\\/g, '/')

const genSideBar = function(dirs) {
  if (typeof dirs === 'string') {
    dirs = [dirs]
  }
  let ret = {}
  dirs.forEach(dir => {
    const pages = glob.sync(`${DOCS_DIR(dir)}/*.md`)
    // ret[dir] = [{
    //   title: dir,
    //   collapsable: false,
    //   sidebarDepth: 2,
    //   children: []
    // }]
    ret[dir] = []
    pages.forEach(page => {
      let pageName = page.match(/\/([^\/]+)\.md/)[1]
      if (pageName === 'README') return
      ret[dir].push([pageName, pageName])
    })
  })

  return ret
}

/**
 * 根据目录生成的结构
 *
 * @returns {
 *    nav: [{
 *      text: 'fe',
 *      items: [
 *        { text: 'library', link: '/fe/library/' }
 *      ]
 *    }],
 *    sidebar: {
 *      '/fe/library/': [['vue', 'vue']]
 *    },
 * }
 */
const genNavAndSidebar = function({ include = [], exclude = [], github = false }) {
  let ret = {
    nav: [],
    sidebar: {}
  }
  let childs = []
  if (include.length > 0) {
    childs = include.map(dir => DOCS_DIR(dir))
  } else {
    childs = glob.sync(`${DOCS_DIR()}/*`, { ignore: exclude.map(e => `${DOCS_DIR()}/${e}`) })
  }
  childs.forEach(child => {
    let isDir = fs.statSync(child).isDirectory()
    if (isDir) {
      let nav = {
        text: child.match(/\/([^\/]+)$/)[1],
        items: []
      }
      let subChilds = glob.sync(`${child}/*`)
      subChilds.forEach(subChild => {
        let isDir = fs.statSync(subChild).isDirectory()
        let text
        let link
        if (isDir) {
          text = subChild.match(/\/([^\/]+)$/)[1]
          link = `/${nav.text}/${text}/`
          ret.sidebar = {
            ...ret.sidebar,
            ...genSideBar(link)
          }
        } else {
          if (/.md/.test(subChild)) {
            text = subChild.match(/\/([^\/]+).md/)[1]
            link = `/${nav.text}/${text}`
          } else {
            return
          }
        }

        nav.items.push({ text, link })
      })
      ret.nav.push(nav)
    }
  })
  if (github) {
    ret.nav.push({ text: 'github', link: 'https://github.com/busyrat/blog' })
  }
  return ret
}

module.exports = {
  DOCS_DIR,
  genNavAndSidebar
}
