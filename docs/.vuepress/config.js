const { genSideBar } = require('./utils')
module.exports = {
  base: "/blog/",
  title: "busyrat blog",
  themeConfig: {
    // 导航栏
    nav: [
      { text: 'fe', 
        items: [
          { text: 'library', link: '/fe/library/' },
          { text: 'ie9', link: '/fe/ie9/' },
          { text: '知识点', link: '/fe/知识点/' },
        ]
      },
      { text: 'op', 
        items: [
          { text: 'docker', link: '/op/docker/' },
          { text: 'linux', link: '/op/linux' },
          { text: 'gitlab-ci', link: '/op/gitlab-ci' },
        ]
      },
      {
        text: 'be',
        items: [
          { text: 'Node', link: '/be/node' },
          { text: 'Redis', link: '/be/Redis' },
        ]
      },
      {
        text: 'others',
        items: [
          { text: '《重学前端》', link: '/others/《重学前端》' },
          { text: 'Git', link: '/others/Git' },
          { text: '工具集', link: '/others/工具集' },
        ]
      },
      { text: 'github', link: 'https://github.com/busyrat/blog' },
    ],
    // 侧边栏
    sidebar: {
      ...genSideBar('/fe/library/'),
      ...genSideBar('/op/docker/'),
    },

    editLinks: true,
    lastUpdated: "上次更新",
    editLinkText: "在 GitHub 上编辑此页"
  }
};
