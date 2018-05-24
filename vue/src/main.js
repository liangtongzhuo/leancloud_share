import Vue from 'vue'
import App from './App.vue'
import router from './router'
import AV from 'leancloud-storage'

const APP_ID = '4On8m21OJDdGG9Cg8I2GlLwP-gzGzoHsz'
const APP_KEY = '9qEsUxAXstOfjT9rYIxbxvxT'
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
