import { stationService } from "../services/station.service.js";

export const stationStore = {
    strict: true,
    state: {
        stations: [],
        genres: ["Hip-Hop", "Band", "Israeli"],
        filterBy: ''
    },
    mutations: {
        setStations(state, { stations }) {
            const filteredStations = stations.filter(station => {
                return station.name.toLowerCase().includes(state.filterBy)
            })
            state.stations = filteredStations
        },
        addToStation(state, { payload }) {
            const station = state.stations.find((s) => s._id === payload.stationId)
            station.songs.push(payload.song)
        },
        removeSong(state, { payload }) {
            const station = state.stations.find((s) => s._id === payload.stationId)
            const songIdx = station.songs.findIndex((s) => s._id === payload.id)
            station.songs.splice(songIdx, 1)
        },
        addStation(state, { stationToAdd }) {
            state.stations.push(stationToAdd)
        },
        setFilter(state, { payload }) {
            state.filterBy = payload;
        },
    },
    actions: {
        async loadStations(context) {
            try {
                const stations = await stationService.query()
                context.commit({ type: 'setStations', stations })
            } catch { }
        },
        async removeSong({ commit }, { payload }) {
            try {
                await stationService.removeSong(payload)
                commit({ type: 'removeSong', payload })
            } catch { }
        },
        async addToStation({ commit }, { payload }) {
            try {
                const songToAdd = await stationService.addSongToStation(payload)
                commit({ type: 'addToStation', payload: { stationId: payload.stationId, song: songToAdd } })
            } catch { }
        },
        async addStation({ commit }, { station }) {
            try {
                const stationToAdd = await stationService.save(station)
                commit({ type: 'addStation', stationToAdd })
                return station._id;
            } catch { }
        },
    }
}