import { stationService } from "../services/station.service.js";

export const stationStore = {
    strict: true,
    state: {
        stations: [],
    },
    mutations: {
        setStations(state, { stations }) {
            state.stations = stations
        },
        addToStation(state, { payload }) {
            const station = state.stations.find((s) => s._id === payload.stationId)
            station.songs.push(payload.song)
        }
    },
    actions: {
        async loadStations(context) {
            try {
                const stations = await stationService.query()
                context.commit({ type: 'setStations', stations })
            } catch {}
        },
        async removeSong(state, { id }) {
            try {
                const idx = this.songs.findIndex((song) => {
                    return song.videoId === id
                });
                state.songs.splice(idx, 1)
            } catch {}
        },
        async loadSongs(state) {
            try {
                const name = this.$route.params.stationName;
                stationService.askSearch(name).then((songs) => {
                    console.log('songs:', songs)
                    this.stationImg = songs[0].snippet.thumbnails.default.url;
                    songs.forEach((song) => {
                        const songToStation = {
                            title: song.snippet.title,
                            artist: song.snippet.channelTitle,
                            desc: song.snippet.description,
                            img: song.snippet.thumbnails.default.url,
                            videoId: song.id.videoId,
                            publishAt: song.snippet.publishedAt,
                        };
                        state.songs.push(songToStation);
                    });
                });
            } catch {}
        },
        async addToStation({ commit }, payload) {
            console.log('payload:', payload)
            try {
                const songToAdd = await stationService.addSongToStation(payload)
                commit({ type: 'addToStation', payload: { stationId: payload.payload.stationId, song: songToAdd } })
            } catch {}
        },
    }
}