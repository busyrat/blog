import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
const requireComponent = require.context('../../components', true, /.*.vue$/)

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  Vue.use(ElementUI)
  requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)
    const component = componentConfig.default
    Vue.component(component.name, component)
  })
}
