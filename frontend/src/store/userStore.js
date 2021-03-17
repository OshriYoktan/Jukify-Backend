
import { userService } from '../services/user.service.js'


export const userStore = {
    strict: true,
    state: {
        user: userService.getLoggedinUser(),
    },
    // Mutations should be SYNC and PURE functions (a pure function does not cause any side effects)
    mutations: {
        userPrefs(state, { prefs }) {
            state.user.prefs = prefs;
            // toyService.saveUser(state.user)
        },
        userPrefsColor(state, prefs) {
            state.user.prefs.color = prefs.color;
            // toyService.save(prefs);
        },
        userPrefsBgcolor(state, prefs) {
            state.user.prefs.bgColor = prefs.bgColor;
            // toyService.save(prefs);
        },
        signUp(state, {user}) {
            state.user = user
            userService.saveUser(user)

        }
    },
    getters: {
        getUser(state) {
            return state.user;
        },
    },
    actions: {

    },
}
