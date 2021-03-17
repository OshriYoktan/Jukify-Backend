import axios from 'axios'
import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const KEY = 'station/'
const station = `https://www.googleapis.com/youtube/v3/stations&key=AIzaSyDvgXWR4K5cYJ_3NKgmwmI99V5W8_RUsEo`
const API = 'AIzaSyAw9w3LHiai8ET2O2DIWA34fVjkrQBIanQ'
const SONGS_KEY = 'songs-results'

export const stationService = {
    query,
    remove,
    save,
    getSongById,
    getEmptyToy,
    askSearch
}

function askSearch(txt) {
    const songs = utilService.loadFromStorage(`${SONGS_KEY}_${txt}`);
    if (songs) {
        console.log('search results from storage')
        return Promise.resolve(songs);
    }
    return axios.get(`https://www.googleapis.com/youtube/v3/search?maxResults=10&part=snippet&videoEmbeddable=true&type=video&key=${API}&q=${txt}`)
        .then(res => {
            console.log('search results NOT from storage')
            utilService.saveToStorage(`${SONGS_KEY}_${txt}`, res.data.items);
            return res.data.items;
        })
        .catch(err => {
            console.log('Service got Error:', err);
        })
}

function query() {
    // return httpService.get(KEY + query, filter)
    return storageService.query('station')
}

function getSongById(id) {
    // return httpService.get(KEY + id)
    
}

function remove(id) {
    // return httpService.delete(KEY + id)
    // return storageService.query('station')
}

function save(toy) {
    if (toy._id) return httpService.put(KEY + toy._id, toy)
    else return httpService.post(KEY, toy)
}

function getEmptyToy(name, price = 100, type, inStock = true) {
    return {
        name,
        price,
        type,
        createdAt: Date.now(),
        inStock
    }
}

function _createToys() {
    var toys = JSON.parse(localStorage.getItem(KEY))
    if (!toys || !toys.length) {
        toys = [
            _createToy('Bear', 50, 'scary'),
            _createToy('Talking Doll', 100, 'funny'),
            _createToy('Sport car', 120, 'car', false),
        ]
        localStorage.setItem(KEY, JSON.stringify(toys))
    }
    return toys;
}

function _createToy(name, price, type, inStock) {
    const toy = getEmptyToy(name, price, type, inStock)
    toy._id = utilService.makeId()
    return toy;
}