
import { userService } from '../services/userService.js'


export const userStore = {
    strict: true,
    state: {
        user: userService.getLoggedinUser(),
        msgToUser:null
    },
    getters: {
        getUser(state) {
            console.log('state.user:', state.user)
            return state.user;
        },
        getMsgToUser(state) {
            return state.msgToUser;
        },
    },
    // Mutations should be SYNC and PURE functions (a pure function does not cause any side effects)
    mutations: {
        signUp(state, { signedUpUser }) {
            state.user = signedUpUser
        },
        login(state, { loggedInUser }) {
            state.user = loggedInUser
        },
        logout(state, { logout }) {
            console.log('logout:', logout)
            // massage to the user with 'logout'
        },
        msg(state, { msg }) {
            state.msgToUser = msg
            // massage to the user with 'logout'
        },
    },
    actions: {
        async signUp(state, { user }) {
            try {
                const signedUpUser = await userService.saveUser(user)
                state.commit({ type: "signUp", signedUpUser })
            } catch (err) {
                state.commit({ type: "msg", msg:err })
                console.log('errorrrrrr', err);
            }
        },
        async login(state, { user }) {
            try {
                const loggedInUser = await userService.loginUser(user)
                state.commit({ type: "login", loggedInUser })
            } catch (err) {
                state.commit({ type: "msg", msg:err })
                console.log('errorrrrrr', err);
            }
        },
        async logout(state) {
            try {
                const logout = await userService.logoutUser()
                state.commit({ type: "logout", logout })
            } catch (err) {
                state.commit({ type: "msg", msg:err })
                console.log('errorrrrrr', err);
            }
        },

    },
}
