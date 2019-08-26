import Home from './modules/home'
import dataDictionary from './modules/dataDictionary/index'
import automaticManage from './modules/automaticManage/index'
// 导出需要显示菜单的
const frameInRoutes = [...Home, ...dataDictionary, ...automaticManage]

export default frameInRoutes
