const fs = require('fs')
const path = require('path')
const _path = p => path.resolve(__dirname, p)

const hashCode = s => {
  return s.split('').reduce(function(a, b) {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)
}

const creatPath = (path) => {
  const pathArr = path.split(/[\\\/]/);
  let _path = '';
  for (let i = 0; i < pathArr.length; i++) {
    if (pathArr[i]) {
      _path += `${pathArr[i]}/`;
      if (!fs.existsSync(_path)) {
        fs.mkdirSync(_path);
      }
    }
  }
}

const creatDemoComponent = (content, name) => {
  creatPath(_path('../components'))
  let file = _path(`../components/${name}.vue`)
  fs.writeFileSync(file, content, { encoding: 'utf8' })
}

module.exports = {
  hashCode,
  creatDemoComponent
}