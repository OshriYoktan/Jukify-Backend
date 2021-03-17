import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import playlistEdit from '../views/playlist-edit.vue'
import userProfile from '../views/user-profile.vue'
import explore from '../views/explore.vue'
import playlistDetails from '../views/playlist-details.vue'

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
        component: playlistEdit
    },
    {
        path: '/explore',
        name: 'explore',
        component: explore
    },
    {
        path: '/details/:playlistId',
        name: 'details',
        component: playlistDetails
    },
]

const router = new VueRouter({
    routes
})

export default router