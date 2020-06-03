import Vue from 'vue'
import App from './App.vue'
import router from './router'
import AV from 'leancloud-storage'

const APP_ID = 'UVuCTCKfeU1kCCAi85Qe2xyS-gzGzoHsz'
const APP_KEY = 'gobTkbGmIhAr7YeJdqox5gBN'
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
