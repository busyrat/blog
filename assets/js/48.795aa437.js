(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{541:function(a,e,s){"use strict";s.r(e);var t=s(18),r=Object(t.a)({},function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"docker-compose"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#docker-compose","aria-hidden":"true"}},[a._v("#")]),a._v(" docker-compose")]),a._v(" "),s("h2",{attrs:{id:"目标"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#目标","aria-hidden":"true"}},[a._v("#")]),a._v(" 目标")]),a._v(" "),s("ul",[s("li",[a._v("搭建一个博客平台")])]),a._v(" "),s("h2",{attrs:{id:"整体架构"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#整体架构","aria-hidden":"true"}},[a._v("#")]),a._v(" 整体架构")]),a._v(" "),s("ul",[s("li",[a._v("nginx")]),a._v(" "),s("li",[a._v("Ghost app")]),a._v(" "),s("li",[a._v("mysql")])]),a._v(" "),s("h2",{attrs:{id:"安装"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装","aria-hidden":"true"}},[a._v("#")]),a._v(" 安装")]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v('sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose\n\n# 添加权限\nsudo chmod a+x /usr/local/bin/docker-compose\n\ndocker-compose --version\n')])])]),s("h2",{attrs:{id:"nginx"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nginx","aria-hidden":"true"}},[a._v("#")]),a._v(" nginx")]),a._v(" "),s("h2",{attrs:{id:"ghost-app"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ghost-app","aria-hidden":"true"}},[a._v("#")]),a._v(" ghost app")]),a._v(" "),s("h2",{attrs:{id:"启动"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#启动","aria-hidden":"true"}},[a._v("#")]),a._v(" 启动")]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("# 第一次不用 build\ndocker-compose up -d\ndocker-compose stop\ndocker-compose rm\ndocker-compose build\n")])])])])},[],!1,null,null,null);e.default=r.exports}}]);