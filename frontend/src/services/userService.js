import { httpService } from './http.service.js'
const KEY = 'loggedinUser'

var gUser = null;

// _loadUserFromStorage();

export const userService = {
    getLoggedinUser,
    saveUser
}

function getLoggedinUser() {
    console.log('gUser:', gUser)
    return JSON.parse(JSON.stringify(gUser))
}

function saveUser(user) {
    gUser = user
    console.log('gUser:', gUser)
    return httpService.post('auth/signup', user)
}



function _saveUserToStorage() {
    localStorage.setItem(KEY, JSON.stringify(gUser))
}
function _loadUserFromStorage() {
    gUser = JSON.parse(localStorage.getItem(KEY))
    if (!gUser) {
        gUser = { _id: 'u101', fullname: 'Hadar Marom', username: 'Hadar' }
        _saveUserToStorage();
    }
}

