import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { gStations } from '../data/station'
import { utilService } from './util.service.js'

const API = 'AIzaSyAw9w3LHiai8ET2O2DIWA34fVjkrQBIanQ'
const SONGS_KEY = 'songs-results'
const KEY = 'stations'

export const stationService = {
    query,
    remove,
    save,
    addSongToStation,
    getStationById,
    getStationIdxById,
    getEmptystation,
    removeSong,
    askSearch,
}

async function askSearch(txt) {
    try {
        const songs = await storageService.query(`${SONGS_KEY}_${txt}`);
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
    } catch (err) {
        console.log('Error from stationService - ', err);
    }
}

async function query() {
    try {
        return await storageService.query(KEY)
    } catch (err) {
        console.log('Error from stationService - ', err);
    }
}

async function save(station) {
    try {
        if (station._id) return await storageService.put(KEY, station)
        return await storageService.post(KEY, station)
    } catch (err) {
        console.log('Error from stationService - ', err);
    }
}

function remove(stationId) {
    try {
        return storageService.remove(stationId).then(res => res.data)
    } catch (err) {
        console.log('Error from stationService - ', err);
    }
}

async function getStationById(id) {
    try {
        return await storageService.get(KEY, id)
    } catch (err) {
        console.log('Error from stationService - ', err);
    }
}

async function getStationIdxById(id) {
    try {
        const stations = await storageService.query(KEY)
        return stations.findIndex((s) => s._id === id)
    } catch (err) {
        console.log('Error from stationService - ', err);
    }
}

function getEmptystation() {
    return {
        name: '',
        imgUrl:'',
        likes: 0,
        songs: []
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
        await storageService.put(KEY, station)
        return songToAdd
    } catch (err) {
        console.log('Error from stationService - ', err);
    }
}

async function removeSong(payload) {
    try {
        var stations = await storageService.query(KEY)
        const station = stations.find((s) => s._id === payload.stationId)
        const songIdx = station.songs.findIndex((s) => s._id === payload.id)
        station.songs.splice(songIdx, 1)
        await storageService.put(KEY, station)
    } catch (err) {
        console.log('Error from stationService - ', err);
    }
}

_createstations()

function _createstations() {
    var stations = JSON.parse(localStorage.getItem(KEY))
    if (!stations || !stations.length) {
        storageService.postMany(KEY, gStations)
    }
}