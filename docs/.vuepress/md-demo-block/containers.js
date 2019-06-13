const container = require('markdown-it-container')
const mdit = require('markdown-it')()

module.exports = md => {
  const validate = params => {
    return params.trim().match(/^demo\s*(.*)$/)
  }

  const render = (tokens, idx) => {
    const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
    if (tokens[idx].nesting === 1) {
      const description = m && m.length > 1 ? m[1] : ''
      const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : ''
      return `<demo-block>
        ${description ? `<div>${mdit.render(description)}</div>` : ''}
        <!--md-demo: ${content}:md-demo-->
      `
    }
    return '</demo-block>'
  }

  md.use(container, 'demo', { render, validate })
}
