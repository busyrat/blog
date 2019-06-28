const glob = require('glob')
const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')
const { Render } = require('@vuese/markdown-render')
const { parser } = require('@vuese/parser')
const { getComponents, mkdirpSync, resolvePath } = require('./utils')

exports.vuese = function() {
  rimraf.sync(resolvePath(`../../components/demo`))
  const componentPath = mkdirpSync(resolvePath(`../../components/demo`))
  fs.writeFileSync(`${componentPath}/README.md`, '', 'utf-8')
  const componentSources = getComponents()

  componentSources.forEach(sourcePath => {
    const demoPath = path.resolve(path.dirname(sourcePath), '.demo.vue')
    const source = fs.readFileSync(sourcePath, 'utf-8')
    let demo = fs.readFileSync(demoPath, 'utf-8')
    try {
      const parserRes = parser(source)
      // 创建渲染实例
      const r = new Render(parserRes)
      // 基本渲染，返回值是一个对象
      const renderRes = r.render()
      // 渲染完整的 markdown 文本，返回值是 markdown 字符串
      const markdownRes = r.renderMarkdown()
      let md = demo.match(/\<md\>([\s\S]*)\<\/md\>/)
      let demomd = ''
      if (md) {
        demo = demo.replace(md[0], '')
        demomd = md[1]
      }
      let demoContent = `\n## Demo\n`
      demoContent += `\n${demomd}\n\:\:\:demo \n\`\`\` vue \n${demo.trim()}\n\`\`\` \n\:\:\:\n`
      const content = markdownRes.content.split('##')
      content[0] += demoContent
      const data = `${content.join('##')}`
      fs.writeFileSync(`${componentPath}/${markdownRes.componentName}.md`, data, 'utf-8')
    } catch (error) {
      console.log(error)
    }
  })
}
