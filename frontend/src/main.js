import Vue from 'vue'
import app from './app.vue'
import './registerServiceWorker'
import router from './router/routes.js'
import store from './store/store.js'
import VueYoutube from 'vue-youtube'
import './assets/style/main.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faExpand, faPauseCircle, faPlay, faStepBackward, faStepForward, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'

library.add(faPlay)
library.add(faPauseCircle)
library.add(faStepBackward)
library.add(faStepForward)
library.add(faVolumeMute)
library.add(faVolumeUp)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueYoutube)
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(app)
}).$mount('#app')