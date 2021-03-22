import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { gStations } from '../data/station'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const API = 'AIzaSyAw9w3LHiai8ET2O2DIWA34fVjkrQBIanQ'
const SONGS_KEY = 'songs-results'
const KEY = 'station/'

export const stationService = {
    query,
    remove,
    save,
    addSongToStation,
    addStationLike,
    getStationById,
    getEmptyStation,
    removeSong,
    askSearch,
}

async function askSearch(txt) {
    try {
        const songs = await storageService.query(`${SONGS_KEY}_${txt}`);
        if (songs.length) {
            console.log('Res from storage')
            return Promise.resolve(songs);
        }
        console.log('api...');
        return axios.get(`https://www.googleapis.com/youtube/v3/search?maxResults=10&part=snippet&videoEmbeddable=true&type=video&key=${API}&q=${txt}`)
            .then(res => {
                storageService.postMany(`${SONGS_KEY}_${txt}`, res.data.items);
                console.log('res.data.items:', res.data.items)
                return res.data.items;
            })
            .catch(err => {
                console.log('Service got Error:', err);
            })
    } catch (err) {
        console.log('Error from stationService - ', err);
    }
}

async function query(filterBy = {}) {
    try {
        var query = '?'
        if (filterBy.byName) query += 'name=' + filterBy.byName + '&'
        if (filterBy.byGenre) query += 'genre=' + filterBy.byGenre + '&'
        return httpService.get(KEY + query)
    } catch (err) {
        console.log('Error from stationService - ', err);
    }
}

async function save(station) {
    try {
        if (station._id) return httpService.put(KEY + station._id, station)
        else return httpService.post(KEY, station)
    } catch (err) {
        console.log('Error from stationService - ', err);
    }
}


async function remove(stationId) {
    try {
        return httpService.delete('station/' + stationId)
    } catch (err) {
        console.log('Error from stationService - ', err);
    }
}

async function getStationById(id) {
    try {
        return httpService.get(KEY + id)
    } catch (err) {
        console.log('Error from stationService - ', err);
    }
}

function getEmptyStation() {
    return {
        name: '',
        imgUrl: '',
        desc: '',
        likes: 0,
        songs: [],
        genres: []
    }
}

async function addSongToStation(payload) {
    try {
        const song = payload.selectedSong
        const station = await getStationById(payload.stationId)
        const songToAdd = {
            _id: utilService.makeId(),
            name: song.snippet.title,
            artist: song.snippet.channelTitle,
            desc: song.snippet.description,
            img: song.snippet.thumbnails.default.url,
            videoId: song.id.videoId,
            publishAt: song.snippet.publishedAt,
        };
        station.songs.push(songToAdd)
        return await save(station);
    } catch (err) {
        console.log('Error from stationService - ', err);
    }
}

async function removeSong(songRemove) {
    try {
        var station = await getStationById(songRemove.stationId)
        const idx = station.songs.find((s) => s._id === songRemove.songId)
        station.songs.splice(idx, 1)
        return await save(station);
    } catch (err) {
        console.log('Error from stationService - ', err);
    }
}

async function addStationLike(stationLiked) {
    try {
        var station = await getStationById(stationLiked.station)
        console.log('station:', station)
        station.likes += stationLiked
        console.log('station.likes:', station.likes)
        return await save(station);
    } catch (err) {
        console.log('Error from stationService - ', err);
    }
}

function _createStations() {
    var stations = JSON.parse(localStorage.getItem(KEY))
    if (!stations || !stations.length) {
        storageService.postMany(KEY, gStations)
    }
}