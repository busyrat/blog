const { vuese } = require('./vuese')

module.exports = (options, ctx) => {
  return {
    name: 'vuese-vue-demo',

    ready() {
      vuese()
      if (options.genNavAndSidebar) {
        let { sidebar, nav } = options.genNavAndSidebar()
        let ctxSidebar = ctx.siteConfig.themeConfig.sidebar || {}
        let ctxNav = ctx.siteConfig.themeConfig.nav || []
        ctx.siteConfig.themeConfig.sidebar = { ...ctxSidebar, ...sidebar }
        ctx.siteConfig.themeConfig.nav = [...ctxNav, ...nav]
      }
    }
  }
}
