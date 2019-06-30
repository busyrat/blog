const path = require('path')
const resolvePath = p => path.resolve(__dirname, p).replace(/\\/g, '/')
const fs = require('fs')
const glob = require('glob')

const getComponents = () => {
  const componentDemos = glob.sync(`${resolvePath('../../../components/')}/**/.demo.vue`)
  const componentSources = componentDemos.map(demoPath => path.resolve(path.dirname(demoPath), 'index.vue'))

  return componentSources
}

const mkdirpSync = path => {
  const pathArr = path.split('/')
  let _path = ''
  for (let i = 0; i < pathArr.length; i++) {
    _path += `${pathArr[i]}/`
    if (!fs.existsSync(_path)) {
      fs.mkdirSync(_path)
    }
  }
  return path
}

module.exports = {
  resolvePath,
  getComponents,
  mkdirpSync
}