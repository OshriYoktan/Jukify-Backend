import axios from 'axios'

const KEY = 'station/'
const station = `https://www.googleapis.com/youtube/v3/stations&key=AIzaSyDvgXWR4K5cYJ_3NKgmwmI99V5W8_RUsEo`


export const stationService = {
    query,
    remove,
    save,
    getToyById,
    getEmptyToy,
    askSearch
}

function askSearch(txt) {
    console.log('api...');
    return axios.get(`https://www.googleapis.com/youtube/v3/search?maxResults=10&part=snippet&videoEmbeddable=true&type=video&key=AIzaSyDvgXWR4K5cYJ_3NKgmwmI99V5W8_RUsEo&q=${txt}`)
        .then(res => {
            // console.log('res:', res)
            return res.data.items;
            // return res.data.items[0].id.videoId;
        })
        .catch(err => {
            console.log('Service got Error:', err);
        })
}


function query(filter = {}) {
    var query = '?'
    if (filter.searchWord) query += 'q=' + filter.searchWord + '&'
    if (filter.sortBy) query += 's=' + filter.sortBy + '&'
    if (filter.stockFilter) query += 'f=' + filter.stockFilter + '&'
    return httpService.get(KEY + query, filter)
}

function getToyById(id) {
    return httpService.get(KEY + id)
}

function remove(id) {
    return httpService.delete(KEY + id)
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