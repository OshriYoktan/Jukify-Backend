import Vue from 'vue'
import app from './app.vue'
import './registerServiceWorker'
import router from './router/routes.js'
import store from './store/store.js'
import VueYoutube from 'vue-youtube'
Vue.use(VueYoutube)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(app)
}).$mount('#app')