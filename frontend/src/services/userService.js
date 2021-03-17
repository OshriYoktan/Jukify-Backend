import {httpService} from './http.service.js'
const KEY = 'loggedinUser'

var gUser = null;

_loadUserFromStorage();

export const userService = {
    getLoggedinUser,
    saveUser
}

function getLoggedinUser() {
    return JSON.parse(JSON.stringify(gUser))
}

function saveUser(user) {
    return httpService.post('auth/signup', user)
}
function _saveUserToStorage() {
    localStorage.setItem(KEY, JSON.stringify(gUser))
}
function _loadUserFromStorage() {
   gUser = JSON.parse(localStorage.getItem(KEY))
    if (!gUser) {
        gUser = {_id: 'u101', fullname: 'Hadar Marom', activities: [{ txt: 'Added a Toy', at: 1523873242735 }], prefs: { color: '', bgColor: '' }}
        _saveUserToStorage();
    }
}
