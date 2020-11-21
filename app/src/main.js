import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'sweetalert2/dist/sweetalert2.min.css'

import App from './App.vue'
import Vue from 'vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
