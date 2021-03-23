import { stationService } from "../services/station.service.js";

export const stationStore = {
    strict: true,
    state: {
        stations: [],
        genres: ["Hip-Hop", "Band", "Israeli"],
        filterBy: null,
        currStation: null
    },
    mutations: {
        setStations(state, { stations }) {
            state.stations = stations
        },
        setCurrStation(state, { id }) {
            const station = state.stations.find((s) => s._id === id)
            state.currStation = station;
        },
        addToStation(state, { payload }) {
            console.log('mutation -', payload)
            const station = state.stations.find((s) => s._id === payload.stationId)
            station.songs.push(payload.song)
        },
        removeSong(state, { songRemove }) {
            const station = state.stations.find((s) => s._id === songRemove.stationId)
            const idx = station.songs.findIndex((s) => s._id === songRemove.songId)
            station.songs.splice(idx, 1)
        },
        addStation(state, { stationToAdd }) {
            state.stations.push(stationToAdd)
        },
        addStationLike(state, { addLike }) {
            const station = state.stations.find((s) => s._id === addLike.station)
            station.likes += addLike.num
        },
        shuffleSongs(state, { stationShuffled }) {
            const station = state.stations.find((s) => s._id === stationShuffled._id)
            station = stationShuffled
        },
    },
    actions: {
        async loadStations({ commit }) {
            try {
                const stations = await stationService.query()
                commit({ type: 'setStations', stations })
            } catch {}
        },
        setCurrStation({ commit }, payload) {
            try {
                commit(payload)
            } catch {}
        },
        async removeSong({ commit }, { songRemove }) {
            try {
                await stationService.removeSong(songRemove)
                commit({ type: 'removeSong', songRemove })
            } catch {}
        },
        async addToStation({ commit }, { payload }) {
            console.log('action - ', payload)
            try {
                const songToAdd = await stationService.addSongToStation(payload)
                commit({ type: 'addToStation', payload: { stationId: payload.stationId, song: songToAdd } })
            } catch {}
        },
        async addStation({ commit }, { station }) {
            try {
                const stationToAdd = await stationService.save(station)
                commit({ type: 'addStation', stationToAdd })
                return stationToAdd._id;
            } catch {}
        },
        async removeStation({ commit }, { payload }) {
            try {
                // const stationToRemove = await stationService.save(payload._id)
                // commit({ type: 'addStation', stationToAdd })
                // return station._id;
            } catch {}
        },
        async addStationLike({ commit }, { addLike }) {
            try {
                const likeAdded = await stationService.addStationLike(addLike)
                commit({ type: 'addStationLike', addLike })
            } catch {}
        },
        async setFilter({ commit }, { filter }) {
            try {
                const stations = await stationService.query(filter)
                commit({ type: 'setStations', stations })
            } catch {}
        },
        async shuffleSongs({ commit }, { stationId }) {
            try {
                const stationShuffled = await stationService.shuffleSongs(stationId)
                commit({ type: 'shuffleSongs', stationShuffled })
            } catch {}
        },
    }
}