const { genSideBar } = require('./utils')
module.exports = {
  base: "/blog/",
  title: "busyrat blog",
  themeConfig: {
    // 导航栏
    nav: [
      { text: '工具', 
        items: [
          { text: 'docker', link: '/docker/' }
        ]
      },
      { text: "Linux", link: "/linux" },
      {
        text: "FE",
        items: [
          { text: "vue", link: "/fe/vue" }
        ]
      },
      { text: 'github', link: 'https://github.com/busyrat/blog' },
    ],
    // 侧边栏
    sidebar: {
      ...genSideBar('/docker/')
    },

    editLinks: true,
    lastUpdated: "上次更新",
    editLinkText: "在 GitHub 上编辑此页"
  }
};
