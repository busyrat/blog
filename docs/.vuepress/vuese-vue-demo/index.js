const { vuese } = require('./vuese')

module.exports = (opts, ctx) => {
  opts = Object.assign(
    {
      navIndex: 0,
      edit: false
    },
    opts
  )
  return {
    name: 'vuese-vue-demo',

    async ready() {
      const componentPath = '/components/'
      const componentsName = await vuese(opts, ctx)
      const nav = {
        text: 'components',
        link: componentPath + componentsName[0]
      }

      const sidebar = {
        [componentPath]: componentsName.map(name => [name, name])
      }

      let ctxSidebar = ctx.siteConfig.themeConfig.sidebar || {}
      let ctxNav = ctx.siteConfig.themeConfig.nav || []
      ctxNav.splice(opts.navIndex, 0, nav)
      ctx.siteConfig.themeConfig.sidebar = { ...ctxSidebar, ...sidebar }
      ctx.siteConfig.themeConfig.nav = ctxNav
    }
  }
}
