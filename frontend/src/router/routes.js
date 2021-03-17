import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import stationEdit from '../views/station-edit.vue'
import userProfile from '../views/user-profile.vue'
import explore from '../views/explore.vue'
import stationDetails from '../views/station-details.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: '/user',
        name: 'user',
        component: userProfile
    },
    {
        path: '/edit',
        name: 'edit',
        component: stationEdit
    },
    {
        path: '/explore',
        name: 'explore',
        component: explore
    },
    {
        path: '/explore/:stationName',
        name: 'details',
        component: stationDetails
    },
]

const router = new VueRouter({
    routes
})

export default router