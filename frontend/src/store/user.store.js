
import { userService } from '../services/userService.js'


export const userStore = {
    strict: true,
    state: {
        user: userService.getLoggedinUser(),
    },
    getters: {
        getUser(state) {
            return state.user;
        },
    },
    // Mutations should be SYNC and PURE functions (a pure function does not cause any side effects)
    mutations: {
        signUp(state, { user }) {
            state.user = user
            userService.saveUser(user)
        }
    },
    actions: {

    },
}
