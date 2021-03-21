export const playerStore = {
    strict: true,
    state: {
        songId: null,
        currStation: null,
        songPlayer: {
            isPlaying: false,
            isMuted: false,
            volumeRange: 50,
            songName: "",
        },
    },
    getters: {
        getSongId(state) {
            return state.songId
        },
        getSongName(state) {
            return state.songPlayer.songName
        },
    },
    mutations: {
        togglePlay(state) {
            if (!state.songPlayer.isPlaying) {
                state.songPlayer.isPlaying = true;
            } else {
                state.songPlayer.isPlaying = false;
            }
        },
        setSongVolume(state, { vol }) {
            state.songPlayer.volumeRange = +vol
        },
        setStation(state, payload) {
            state.currStation = payload.currStation;
        },
        playVideo(state, { payload }) {
            state.songId = payload.payload.videoId
            const currSong = payload.payload.station.songs.find((song) => {
                return song.videoId === state.songId;
            });
            state.songPlayer.songName = currSong.name;
        },
        changeSong(state, { payload }) {
            const idx = payload.payload.station.songs.findIndex((song) => {
                return song.videoId === state.songId;
            });
            var songIdx = idx + payload.payload.dif;
            if (songIdx === payload.payload.station.songs.length) songIdx = 0;
            if (songIdx === -1) songIdx = payload.payload.station.songs.length - 1;
            const nextSong = payload.payload.station.songs[songIdx];
            state.songId = nextSong.videoId;
            state.songPlayer.songName = nextSong.name;
            console.log('state.songPlayer.songName:', state.songPlayer.songName)
        },
        muteSong(state) {
            if (!state.songPlayer.isMuted) {
                state.songPlayer.isMuted = true;
            } else {
                state.songPlayer.isMuted = false;
            }
        },
    },
    actions: {
        async togglePlay(state) {
            try {
                state.commit({ type: 'togglePlay' })
                return state.state.songPlayer.isPlaying;

            } catch { }
        },
        setSongVolume(state, { vol }) {
            try {
                state.commit({ type: 'setSongVolume', vol })
                return state.state.songPlayer.volumeRange
            } catch { }
        },
        playVideo(state, payload) {
            try {
                state.commit({ type: 'playVideo', payload })
                return state.songPlayer.songName
            } catch { }
        },
        changeSong(state, payload) {
            try {
                state.commit({ type: 'changeSong', payload })
            } catch { }
        },
        muteSong(state) {
            try {
                state.commit({ type: 'muteSong' })
                return state.state.songPlayer.isMuted
            } catch { }
        },
        setStation(state, { currStation }) {
            try {
                state.commit({ type: 'setStation', currStation })
                // return state.state.songPlayer.isMuted
            } catch { }
        },
    }
}