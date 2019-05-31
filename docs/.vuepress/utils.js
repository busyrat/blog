const glob = require('glob')
const path = require('path')

const DOCS_DIR = dir => path.join(__dirname, '../', dir)

exports.genSideBar = function (dirs) {
  if(typeof dirs === 'string') {
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
