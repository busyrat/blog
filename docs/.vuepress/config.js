const { genNavAndSidebar } = require("./utils");
module.exports = {
  base: "/blog/",
  title: "busyrat blog",
  port: 7070,
  themeConfig: {
    ...genNavAndSidebar(),
    // nav: { text: 'fe',
    //   items: [
    //     { text: 'library', link: '/fe/library/' }
    //   ]
    // },
    // sidebar: {
    //   '/fe/library/': [['vue', 'vue']]
    // },

    editLinks: true,
    lastUpdated: "上次更新",
    editLinkText: "在 GitHub 上编辑此页"
  },
  plugins: [
    require("./md-demo-block")
  ]
};
