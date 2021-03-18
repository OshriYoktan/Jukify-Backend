import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { gStations } from '../data/station'
import { utilService } from './util.service.js'

const API = 'AIzaSyAw9w3LHiai8ET2O2DIWA34fVjkrQBIanQ'
const SONGS_KEY = 'songs-results'
const KEY = 'stations'

var ggStations;

export const stationService = {
    query,
    remove,
    save,
    addSongToStation,
    getStationById,
    getEmptystation,
    removeSong,
    askSearch,
}

async function askSearch(txt) {
    try {
        const songs = await storageService.query(`${SONGS_KEY}_${txt}`);
        console.log('songs:', songs)
        if (songs.length) {
            console.log('search results from storage')
            return Promise.resolve(songs);
        }
        console.log('api...');
        return axios.get(`https://www.googleapis.com/youtube/v3/search?maxResults=10&part=snippet&videoEmbeddable=true&type=video&key=${API}&q=${txt}`)
            .then(res => {
                storageService.postMany(`${SONGS_KEY}_${txt}`, res.data.items);
                return res.data.items;
            })
            .catch(err => {
                console.log('Service got Error:', err);
            })
    } catch {}
}

function query() {
    ggStations = utilService.loadFromStorage(KEY)
    return Promise.resolve(ggStations)
        // return storageService.get(BUG_URL).then(res => res.data)
}

function save() {
    return
    // return (station._id) ? storageService.put(station).then(res => res.data) : storageService.post(station).then(res => res.data)
}

function remove(stationId) {
    return storageService.remove(stationId).then(res => res.data)
}

function getStationById(id) {
    var station = ggStations[0].find((s) => {
        return s._id === id
    })
    return Promise.resolve(station)
}

function getEmptystation() {
    return {
        name: '',
        songs: []
    }
}

function addSongToStation({ payload }) {
    console.log('payload:', payload)
    const song = payload.selectedSong
    ggStations = utilService.loadFromStorage(KEY)
    const station = ggStations[0].find((s) => s._id === payload.stationId)
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
    saveToStorage()
    return Promise.resolve(songToAdd)
}

function removeSong(payload) {
    ggStations = utilService.loadFromStorage(KEY)
    const station = ggStations[0].find((s) => s._id === payload.stationId)
    const songIdx = station.songs.findIndex((s) => s._id === payload.id)
    station.songs.splice(songIdx, 1)
    saveToStorage()
    return Promise.resolve
}

function saveToStorage() {
    utilService.saveToStorage(KEY, ggStations)
}

_createstations()

function _createstations() {
    var stations = JSON.parse(localStorage.getItem(KEY))
    if (!stations || !stations.length) {
        storageService.post(KEY, gStations)
    }
}