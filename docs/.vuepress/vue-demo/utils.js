const path = require('path')
const resolvePath = p => path.resolve(__dirname, p).replace(/\\/g, '/')

const hashCode = s => {
  return s.split('').reduce(function(a, b) {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)
}

const creatDemoComponent = async (ctx, content, name) => {
  await ctx.writeTemp(`dynamic/demo/${name}.vue`, content, { encoding: 'utf8' })
}

module.exports = {
  resolvePath,
  hashCode,
  creatDemoComponent
}
