import Icon from 'vue-svg-icon/Icon.vue'

import YtoTable from './element/YtoTable'
import YtoPage from './element/YtoPage'
import YtoButton from './element/YtoButton'
import YtoFormItem from './element/YtoFormItem'
import YtoForm from './element/YtoForm'
import YtoSvg from './element/YtoSvg'

const Yto = {
  install: function (Vue) {
    Vue.component(YtoTable.name, YtoTable)
    Vue.component(YtoPage.name, YtoPage)
    Vue.component(YtoButton.name, YtoButton)
    Vue.component(YtoFormItem.name, YtoFormItem)
    Vue.component(YtoForm.name, YtoForm)
    Vue.component(YtoSvg.name, YtoSvg)
    Vue.component('icon', Icon)
  }
}

export default Yto
