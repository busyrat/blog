const container = require('markdown-it-container')
const mdit = require('markdown-it')()
const fs = require('fs')
const path = require('path')
const _path = p => path.resolve(__dirname, p)

module.exports = md => {
  tagNameIndex = 0

  const hashCode = s => {
    return s.split('').reduce(function(a, b) {
      a = (a << 5) - a + b.charCodeAt(0)
      return a & a
    }, 0)
  }

  creatPath = (path) => {
    const pathArr = path.split('/');
    let _path = '';
    for (let i = 0; i < pathArr.length; i++) {
      if (pathArr[i]) {
        _path += `/${pathArr[i]}`;
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

  const validate = params => {
    return params.trim().match(/^demo\s*(.*)$/)
  }

  const render = (tokens, idx, options, env, self) => {
    const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
    
    if (tokens[idx].nesting === 1) {
      const description = m && m.length > 1 ? m[1] : ''
      const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : ''
    
      const isNewPage = tokens.slice(0, idx).filter(_ => _.type === 'container_demo_open').length === 0
      if (isNewPage) {
        tagNameIndex = 0
      } else {
        tagNameIndex++
      }
      const tagName = `demo-block-${hashCode(env.relativePath)}-${tagNameIndex}`
      creatDemoComponent(content, tagName)

      return `<demo-block>
        <template slot="source"><${tagName}/></template>
        ${description ? `<div>${mdit.render(description)}</div>` : ''}
      `
    }
    return '</demo-block>'
  }

  md.use(container, 'demo', { render, validate })
}
