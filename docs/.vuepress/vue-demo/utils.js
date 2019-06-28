const path = require('path')
const resolvePath = p => path.resolve(__dirname, p).replace(/\\/g, '/')
const fs = require('fs')
const glob = require('glob')

const hashCode = s => {
  return s.split('').reduce(function(a, b) {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)
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

const creatDemoComponent = async (ctx, content, name) => {
  await ctx.writeTemp(`dynamic/demo/${name}.vue`, content, { encoding: 'utf8' })
}

const getComponents = () => {
  console.log(resolvePath('../../../components/'))
  const componentDemos = glob.sync(`${resolvePath('../../../components/')}/**/.demo.vue`)
  const componentSources = componentDemos.map(demoPath => path.resolve(path.dirname(demoPath), 'index.vue'))

  return componentSources
}

module.exports = {
  resolvePath,
  hashCode,
  creatDemoComponent,
  getComponents,
  mkdirpSync
}
