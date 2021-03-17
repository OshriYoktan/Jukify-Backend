import stationService from '../services/station.service.js'
export const stationStore = {
    state: {
        station: [],
    },
    getters: {

    },
    mutations: {

    },
    actions: {
        async loadStations(context) {
            try {
                const reviews = await stationService.query();
                context.commit({ type: 'setReviews', reviews })
            } catch (err) {
                console.log('reviewStore: Error in loadReviews', err)
                throw err
            }
        },



    }
}