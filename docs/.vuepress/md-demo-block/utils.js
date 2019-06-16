const path = require('path')
const resolvePath = p => path.resolve(__dirname, p).replace(/\\/g, '/')
// const fs = require('fs')
const MemoryFileSystem = require("memory-fs");
const fs = new MemoryFileSystem();

const hashCode = s => {
  return s.split('').reduce(function(a, b) {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)
}

const mkdirpSync = (path) => {
  const pathArr = path.split('/');
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
  // mkdirpSync(resolvePath('../components'))
  fs.mkdirpSync(resolvePath('../components'))

  let file = resolvePath(`../components/${name}.vue`)
  fs.writeFileSync(file, content, { encoding: 'utf8' })
}

module.exports = {
  fs,
  resolvePath,
  hashCode,
  creatDemoComponent
}