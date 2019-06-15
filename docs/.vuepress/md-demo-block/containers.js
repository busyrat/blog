const container = require('markdown-it-container')
const mdit = require('markdown-it')()
const { hashCode, creatDemoComponent } = require('./utils')

module.exports = md => {
  tagNameIndex = 0

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
